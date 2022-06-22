<template>
  <div>
    <div v-if="!previewTable" class="container bg-white rounded">
      <div class="p-2 border-bottom" @click="$router.go(-1)">
        <Icon icon="akar-icons:arrow-left" :style="{ fontSize: '1.5rem' }" />
        Bulk enroll Student(s)
      </div>
      <div
        class="m-2 py-5 d-flex justify-content-center align-items-center text-center"
        :style="{ display: 'flex', 'flex-direction': 'column' }"
      >
        <div>
          <p class="text-secondary">
            Before you upload your files below, make sure your file is ready to be
            imported
          </p>
        </div>
        <div
          v-cloak
          class="p-5 mt-2 blue-dashed"
          :style="{ cursor: 'pointer' }"
          @click="uploadFile"
          @drop.prevent="addFile"
          @dragover.prevent
        >
          <p class="text-secondary">
            <span v-if="!showNext">
              it is advisable to download and edit the sample form. you can also drag and
              drop or choose a file to upload your File. All .csv, .xlsx, and .xls file
              types are supported. please note that all fields are required and date
              inputs should be the same as the example.
            </span>
            <span v-else> {{ file.name }} </span>
          </p>
        </div>
        <div class="mt-3 underline">
          <p
            class="font-weight-bold"
            :style="{ cursor: 'pointer' }"
            @click="downloadSample"
          >
            <u> Download sample spreadsheet </u>
          </p>
        </div>
        <div v-if="showNext">
          <b-button class="bg-primary" @click="previewTable = true"> Next</b-button>
        </div>
        <input
          ref="fileInput"
          type="file"
          class="invisible"
          accept=".xlsx, .xls, .csv"
          @change="onChange"
        />
      </div>
    </div>
    <div v-else>
      <div class="container bg-white p-3 rounded d-flex justify-content-between">
        <div @click="previewTable = false">
          <Icon
            icon="akar-icons:arrow-left"
            :style="{ fontsize: '1.5rem' }"
            class="mr-1"
          />
          Upload Student
        </div>
        <div>
          {{ staffData.length ? staffData.length : 0 }} record(s) to uploads
          <span class="ml-3 text-secondary">
            <BaseButton class="no-uppercase" :watch-request="true" @click="uploadStaffs">
              Upload Student(s)
            </BaseButton>

            <b-button class="bg-primary" @click="reupload"> Reupload</b-button>
            <b-button class="bg-info" @click="downloadTable"> Export Table</b-button>
          </span>
        </div>
      </div>
      <div v-if="succesMessage" class="mt-2 text-center">
        <h4 class="text-success">{{ succesMessage }}</h4>
      </div>
      <div v-if="staffData" class="mt-5 container rounded bg-white">
        <b-button
          v-show="showRecordbtn"
          class="ml-4 mt-2 bg-secondary"
          @click="addRecord"
        >
          Add Record
        </b-button>
        <TableWrapper :fields="fields" :show-pagination="false" :items="staffData">
          <template
            v-for="(cell, cellIndex) in Object.keys(staffData[0])"
            #[cell]="{ data }"
          >
            <div :key="cellIndex" class="mx-1">
              <span v-if="data.item.error_message">
                <input
                  v-model="data.item[cell]"
                  :style="{
                    width: data.item[cell] ? data.item[cell].length + 1 + 'ch' : '3ch',
                  }"
                  type="text"
                />
              </span>

              <span v-else class=""> {{ data.item[cell] }}</span>
            </div>
          </template>

          <template #error_message="{ data }">
            <span class="text-danger" :style="{ fontSize: '0.8rem' }">{{
              data.item.error_message
            }}</span> </template
          ><template #error_message_head="{ data }">
            <span class="text-danger">{{ data.label }}</span>
          </template>
          <template #emailHeader="{ data }">
            <div class="text-center">{{ data.label }}</div>
          </template>
        </TableWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      showNext: false,
      showRecordbtn: false,
      staffData: [],
      succesMessage: "",
      fields: null,
      staffError: "",
      previewTable: false,
      file: {},
      files: [],
      containerText: "sssds",
      items: [
        {
          first_name: "Ime",
          middle_name: "Z",

          last_name: "Chukuw",
          gender: "Male",
          nationality: "Nigeria",
          phone_number: "08023499180",
          email: "johndoe@gmail.com",
          date_of_birth: "1998-12-11",
          admission_number: "anything",
          present_academic_year: "2021/2022",
          present_grade_level: "Nursery 2",
          class: "Tulip",
        },
      ],
    };
  },
  computed: {
    schoolId() {
      return this.$store.state.administration.school.id;
    },
  },

  methods: {
    addRecord() {
      this.staffData.push({
        first_name: "",
        middle_name: "",

        last_name: "",
        gender: "",
        nationality: "",
        phone_number: "",
        email: "",
        date_of_birth: "",
        admission_number: "",
        present_academic_year: "",
        present_grade_level: "",
        class: "",
        error_message: "empty fields",
      });
    },
    reupload() {
      this.file = {};
      this.fields = null;
      this.showNext = false;
      this.showRecordbtn = false;
      this.previewTable = false;
    },
    addFile(e) {
      console.log("the whole thing", e);
      const droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return; // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      this.files = droppedFiles[0];
      console.log(this.files);
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.files);
      reader.onload = function () {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const final = XLSX.utils.sheet_to_json(sheet);
        this.staffData = final;

        console.log("output", final);
        this.file = this.files;
        this.showNext = true;
      }.bind(this);
    },
    downloadTable() {
      const data = XLSX.utils.json_to_sheet(this.staffData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "Students.xlsx");
    },

    async uploadStaffs() {
      const schoolCode = this.$store.state.administration.school.code;

      try {
        const { data } = await this.$axios.post(
          `/slate-admin/school/${this.schoolId}/student/bulk/`,
          {
            students: this.staffData,
          }
        );
        this.succesMessage = data.message;
        setTimeout(() => {
          this.$router.push(`/sms/${schoolCode}/administration/student`);
        }, 2000);
        console.log(data.message);
      } catch (error) {
        console.log(error);
        this.fields = [
          { key: "error_message" },
          { key: "first_name" },
          { key: "middle_name" },
          { key: "last_name" },
          { key: "gender" },
          { key: "email" },
          { key: "date_of_birth" },
          { key: "admission_number" },
          { key: "present_grade_level" },
          { key: "present_academic_year" },
          { key: "class" },

          { key: "nationality" },
          { key: "phone_number" },

          // { key: 'status', sortable: true },
        ];
        console.log("fields", this.fields);
        if (error.response) {
          this.staffError = error.response.data.error;
          console.log("error o", this.staffError);
          this.staffData = this.staffData
            .map((e) => ({
              ...e,
              error_message: "", // add error message
            }))
            .map((itm, a) => ({
              ...itm,
              ...this.staffError.find((item) => a === item.index),
            }))
            .map(({ staff_name, index, ...rest }) => {
              return rest; // remove unnecesary data
            })
            .filter((e) => {
              return e.error_message; // filter out students with no error message
            });
          this.showRecordbtn = true;
          console.log("new array", this.staffData);
        }
      }
    },
    onChange(e) {
      if (e) {
        console.log("xl sheet");
        const file = e.target.files[0];
        console.log("the whole thing", file);

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
          const data = new Uint8Array(reader.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const final = XLSX.utils.sheet_to_json(sheet);
          this.staffData = final;

          console.log("output", final);
          this.file = file;
          this.showNext = true;
        }.bind(this);
      }
    },
    uploadFile() {
      if (this.$refs.fileInput) {
        const uploadField = this.$refs.fileInput;
        uploadField.click();
      }
    },
    downloadSample() {
      const data = XLSX.utils.json_to_sheet(this.items);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "Sample_Student.xlsx");
    },
  },
};
</script>

<style scoped>
.blue-dashed {
  background-color: #e9f0f8;
  border-style: dotted;
  border-color: #1170b7;
}
</style>
