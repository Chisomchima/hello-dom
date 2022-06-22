<template>
  <div class="timetable-item-wrapper">
    <div class="item-subject">{{ subject }}</div>
    <div class="d-flex align-items-center">
      <div class="item-time">{{ time }}</div>
      <button class="item-btn">{{ code }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subject: {
      type: String,
      default: 'Biology',
    },
    time: {
      type: String,
      default: '12:00am - 12:45am',
    },
    code: {
      type: String,
      default: 'BIO 003',
    },
  },
}
</script>

<style>
.timetable-item-wrapper {
  background: #fafafa;
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  padding: 20px 13px 18px 20px;
}
.item-subject {
  font-size: 14px;
  color: #6161ba;
  margin-bottom: 8px;
}
.item-time {
  font-size: 12px;
  color: #8b9eb0;
  margin-right: 16px;
}
.item-btn {
  padding: 6px 10px;
  color: #fff;
  background: #6161ba;
  border-radius: 3px;
  border: 0;
}
@media (min-width: 1200px) {
  .modal-xl {
    max-width: 95%;
  }
}
</style>
