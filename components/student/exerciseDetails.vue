<template>
  <div>
    <div
      class="fs-14 text-light line-height-150p text-center mx-auto mt-4"
      style="max-width: 489px"
    >
      <!-- Answer all questions. Extra marks will be awarded for good presentation of
      answers and showing of workings -->
      {{ description }}
    </div>
    <!-- <div class="text-dark line-height-170p">
                        Opera refers to a dramatic art form, originating in
                        Europe, in which the emotional content is conveyed to
                        the audience as much through music, both vocal and
                        instrumental, as it is through the lyrics. By contrast,
                        in musical theater an actor's dramatic performance is
                        primary, and the music plays a lesser role. The drama in
                        opera is presented using the primary elements of theater
                        such as scenery, costumes, and acting. However, the
                        words of the opera, or libretto, are sung rather than
                        spoken. The singers are accompanied by a musical
                        ensemble ranging from a small instrumental ensemble to a
                        full symphonic orchestra.
                    </div> -->
    <!-- <div class="mt-5">
                        <div
                            class="
                                text-primary
                                fs-14
                                mb-3
                                font-family_brown
                                d-flex
                                align-items-center
                                justify-content-between
                            "
                        >
                            <div>QUESTION</div>
                        </div>
                        <div class="mb-3 font-family_brown fs-14 text-dark">
                            Write an essay and attach pictures to illustrate
                            your points, upload a word document
                        </div>

                        <div>
                            <div class="row align-items-end mb-3">
                                <div class="col-md-8">
                                    <div
                                        class="
                                            upload-doc-wrapper
                                            justify-content-between
                                        "
                                        style="max-width: 250px"
                                    >
                                        <div class="d-flex align-items-center">
                                            <div class="icon-wrapper">
                                                <svg
                                                    class="icon"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0)">
                                                        <path
                                                            d="M15.5002 8.16634C15.2557 8.16634 15.0418 8.07467 14.8585 7.89134L10.0002 3.03301L5.14183 7.89134C4.77516 8.25801 4.19461 8.25801 3.8585 7.89134C3.49183 7.52467 3.49183 6.94412 3.8585 6.60801L9.3585 1.10801C9.72516 0.741341 10.3057 0.741341 10.6418 1.10801L16.1418 6.60801C16.5085 6.97467 16.5085 7.55523 16.1418 7.89134C15.9585 8.07467 15.7446 8.16634 15.5002 8.16634Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M16.3557 19.1659H3.64461C2.08627 19.1659 0.833496 17.9131 0.833496 16.3548V12.6882C0.833496 12.1687 1.23072 11.7715 1.75016 11.7715C2.26961 11.7715 2.66683 12.1687 2.66683 12.6882V16.3548C2.66683 16.9048 3.09461 17.3326 3.64461 17.3326H16.3557C16.9057 17.3326 17.3335 16.9048 17.3335 16.3548V12.6882C17.3335 12.1687 17.7307 11.7715 18.2502 11.7715C18.7696 11.7715 19.1668 12.1687 19.1668 12.6882V16.3548C19.1668 17.9131 17.914 19.1659 16.3557 19.1659Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M10.0002 14.4911C9.48072 14.4911 9.0835 14.0939 9.0835 13.5744V2.72721C9.0835 2.20777 9.48072 1.81055 10.0002 1.81055C10.5196 1.81055 10.9168 2.20777 10.9168 2.72721V13.5744C10.9168 14.0939 10.5196 14.4911 10.0002 14.4911Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect
                                                                width="18.3333"
                                                                height="18.3333"
                                                                fill="white"
                                                                transform="translate(0.833496 0.833008)"
                                                            ></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="text-primary fs-14 pointer">
                                            <strong>Upload File</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-end mb-3">
                                <div class="col-md-8">
                                    <div
                                        class="
                                            upload-doc-wrapper
                                            w-max-100
                                            justify-content-between
                                        "
                                    >
                                        <div class="d-flex align-items-center">
                                            <div class="icon-wrapper">
                                                <svg
                                                    class="icon"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0)">
                                                        <path
                                                            d="M15.5002 8.16634C15.2557 8.16634 15.0418 8.07467 14.8585 7.89134L10.0002 3.03301L5.14183 7.89134C4.77516 8.25801 4.19461 8.25801 3.8585 7.89134C3.49183 7.52467 3.49183 6.94412 3.8585 6.60801L9.3585 1.10801C9.72516 0.741341 10.3057 0.741341 10.6418 1.10801L16.1418 6.60801C16.5085 6.97467 16.5085 7.55523 16.1418 7.89134C15.9585 8.07467 15.7446 8.16634 15.5002 8.16634Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M16.3557 19.1659H3.64461C2.08627 19.1659 0.833496 17.9131 0.833496 16.3548V12.6882C0.833496 12.1687 1.23072 11.7715 1.75016 11.7715C2.26961 11.7715 2.66683 12.1687 2.66683 12.6882V16.3548C2.66683 16.9048 3.09461 17.3326 3.64461 17.3326H16.3557C16.9057 17.3326 17.3335 16.9048 17.3335 16.3548V12.6882C17.3335 12.1687 17.7307 11.7715 18.2502 11.7715C18.7696 11.7715 19.1668 12.1687 19.1668 12.6882V16.3548C19.1668 17.9131 17.914 19.1659 16.3557 19.1659Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M10.0002 14.4911C9.48072 14.4911 9.0835 14.0939 9.0835 13.5744V2.72721C9.0835 2.20777 9.48072 1.81055 10.0002 1.81055C10.5196 1.81055 10.9168 2.20777 10.9168 2.72721V13.5744C10.9168 14.0939 10.5196 14.4911 10.0002 14.4911Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect
                                                                width="18.3333"
                                                                height="18.3333"
                                                                fill="white"
                                                                transform="translate(0.833496 0.833008)"
                                                            ></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div class="ml-3">
                                                <div
                                                    class="
                                                        doc-title
                                                        text-truncate
                                                    "
                                                >
                                                    Essay.doc
                                                </div>
                                                <div class="doc-size">
                                                    570 kb
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <span class="fs-12 text-light mr-1"
                                                >Uploading...</span
                                            >
                                            <svg
                                                class="animator spin"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10.7465 22.4251C8.44215 22.1484 6.29441 21.116 4.63898 19.4893C2.98355 17.8626 1.91372 15.7333 1.59672 13.4341C1.27972 11.135 1.73341 8.79556 2.88688 6.78158C4.04034 4.7676 5.82858 3.19254 7.97207 2.30258C10.1156 1.41263 12.4935 1.25793 14.7343 1.86268C16.975 2.46743 18.9522 3.79754 20.3569 5.64511C21.7616 7.49267 22.5145 9.75357 22.4981 12.0744C22.4816 14.3953 21.6967 16.6453 20.2659 18.4727"
                                                    stroke="#1070B7"
                                                    stroke-width="3"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-end mb-3">
                                <div class="col-md-8">
                                    <div
                                        class="
                                            upload-doc-wrapper
                                            w-max-100
                                            justify-content-between
                                        "
                                    >
                                        <div class="d-flex align-items-center">
                                            <div class="icon-wrapper">
                                                <svg
                                                    class="icon"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0)">
                                                        <path
                                                            d="M15.5002 8.16634C15.2557 8.16634 15.0418 8.07467 14.8585 7.89134L10.0002 3.03301L5.14183 7.89134C4.77516 8.25801 4.19461 8.25801 3.8585 7.89134C3.49183 7.52467 3.49183 6.94412 3.8585 6.60801L9.3585 1.10801C9.72516 0.741341 10.3057 0.741341 10.6418 1.10801L16.1418 6.60801C16.5085 6.97467 16.5085 7.55523 16.1418 7.89134C15.9585 8.07467 15.7446 8.16634 15.5002 8.16634Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M16.3557 19.1659H3.64461C2.08627 19.1659 0.833496 17.9131 0.833496 16.3548V12.6882C0.833496 12.1687 1.23072 11.7715 1.75016 11.7715C2.26961 11.7715 2.66683 12.1687 2.66683 12.6882V16.3548C2.66683 16.9048 3.09461 17.3326 3.64461 17.3326H16.3557C16.9057 17.3326 17.3335 16.9048 17.3335 16.3548V12.6882C17.3335 12.1687 17.7307 11.7715 18.2502 11.7715C18.7696 11.7715 19.1668 12.1687 19.1668 12.6882V16.3548C19.1668 17.9131 17.914 19.1659 16.3557 19.1659Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M10.0002 14.4911C9.48072 14.4911 9.0835 14.0939 9.0835 13.5744V2.72721C9.0835 2.20777 9.48072 1.81055 10.0002 1.81055C10.5196 1.81055 10.9168 2.20777 10.9168 2.72721V13.5744C10.9168 14.0939 10.5196 14.4911 10.0002 14.4911Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect
                                                                width="18.3333"
                                                                height="18.3333"
                                                                fill="white"
                                                                transform="translate(0.833496 0.833008)"
                                                            ></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div class="ml-3">
                                                <div
                                                    class="
                                                        doc-title
                                                        text-truncate
                                                    "
                                                >
                                                    Essay.doc
                                                </div>
                                                <div class="doc-size">
                                                    570 kb
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-primary fs-14 pointer">
                                            <strong>Change File</strong>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="
                                        col-md-4
                                        text-right text-md-left
                                        mt-2 mt-md-0
                                        pb-2
                                    "
                                >
                                    <span
                                        class="
                                            text-primary
                                            mr-2
                                            fs-14
                                            font-weight-bold
                                            pointer
                                        "
                                        >Rename</span
                                    >
                                    <span
                                        class="
                                            text-danger
                                            mr-2
                                            fs-14
                                            font-weight-bold
                                            pointer
                                        "
                                        >Delete</span
                                    >
                                </div>
                            </div>
                            <div class="row align-items-end mb-3">
                                <div class="col-md-8">
                                    <div
                                        class="
                                            upload-doc-wrapper
                                            w-max-100
                                            justify-content-between
                                        "
                                    >
                                        <div class="d-flex align-items-center">
                                            <div class="icon-wrapper">
                                                <svg
                                                    class="icon"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0)">
                                                        <path
                                                            d="M15.5002 8.16634C15.2557 8.16634 15.0418 8.07467 14.8585 7.89134L10.0002 3.03301L5.14183 7.89134C4.77516 8.25801 4.19461 8.25801 3.8585 7.89134C3.49183 7.52467 3.49183 6.94412 3.8585 6.60801L9.3585 1.10801C9.72516 0.741341 10.3057 0.741341 10.6418 1.10801L16.1418 6.60801C16.5085 6.97467 16.5085 7.55523 16.1418 7.89134C15.9585 8.07467 15.7446 8.16634 15.5002 8.16634Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M16.3557 19.1659H3.64461C2.08627 19.1659 0.833496 17.9131 0.833496 16.3548V12.6882C0.833496 12.1687 1.23072 11.7715 1.75016 11.7715C2.26961 11.7715 2.66683 12.1687 2.66683 12.6882V16.3548C2.66683 16.9048 3.09461 17.3326 3.64461 17.3326H16.3557C16.9057 17.3326 17.3335 16.9048 17.3335 16.3548V12.6882C17.3335 12.1687 17.7307 11.7715 18.2502 11.7715C18.7696 11.7715 19.1668 12.1687 19.1668 12.6882V16.3548C19.1668 17.9131 17.914 19.1659 16.3557 19.1659Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M10.0002 14.4911C9.48072 14.4911 9.0835 14.0939 9.0835 13.5744V2.72721C9.0835 2.20777 9.48072 1.81055 10.0002 1.81055C10.5196 1.81055 10.9168 2.20777 10.9168 2.72721V13.5744C10.9168 14.0939 10.5196 14.4911 10.0002 14.4911Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect
                                                                width="18.3333"
                                                                height="18.3333"
                                                                fill="white"
                                                                transform="translate(0.833496 0.833008)"
                                                            ></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div class="ml-3">
                                                <div
                                                    class="
                                                        doc-title
                                                        d-flex
                                                        align-items-center
                                                    "
                                                >
                                                    <input
                                                        class="
                                                            form-control
                                                            h-auto
                                                            fs-14
                                                            px-1
                                                            py-1
                                                            flex-grow-1
                                                        "
                                                        placeholder="Enter name"
                                                        value="Essay"
                                                    />.doc
                                                </div>
                                                <div class="doc-size">
                                                    570 kb
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-primary fs-14 pointer">
                                            <strong>Change File</strong>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="
                                        col-md-4
                                        text-right text-md-left
                                        mt-2 mt-md-0
                                        pb-2
                                    "
                                >
                                    <span
                                        class="
                                            text-primary
                                            mr-2
                                            fs-14
                                            font-weight-bold
                                            pointer
                                        "
                                        >Save</span
                                    >
                                    <span
                                        class="
                                            text-danger
                                            mr-2
                                            fs-14
                                            font-weight-bold
                                            pointer
                                        "
                                        >Delete</span
                                    >
                                </div>
                            </div>
                            <div
                                class="
                                    text-primary
                                    pointer
                                    d-flex
                                    align-content-center
                                    mt-3
                                "
                            >
                                <div class="mr-1 h1 line-height-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        focusable="false"
                                        width="1em"
                                        height="1em"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                        class="iconify fs-16"
                                        data-icon="fluent:add-24-filled"
                                        style="
                                            vertical-align: -0.125em;
                                            transform: rotate(360deg);
                                        "
                                    >
                                        <g fill="none">
                                            <path
                                                d="M11.883 3.007L12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007z"
                                                fill="currentColor"
                                            ></path>
                                        </g>
                                    </svg>
                                </div>
                                <strong class="fs-14">Add Attachment</strong>
                            </div>
                        </div>

                        <div>
                            <div class="row">
                                <div class="col-md-7 col-lg-12 col-xl-7">
                                    <div
                                        class="
                                            upload-doc-wrapper
                                            w-max-100
                                            justify-content-between
                                            mb-3
                                        "
                                    >
                                        <div class="d-flex align-items-center">
                                            <div class="icon-wrapper">
                                                <svg
                                                    class="icon"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0)">
                                                        <path
                                                            d="M15.5002 8.16634C15.2557 8.16634 15.0418 8.07467 14.8585 7.89134L10.0002 3.03301L5.14183 7.89134C4.77516 8.25801 4.19461 8.25801 3.8585 7.89134C3.49183 7.52467 3.49183 6.94412 3.8585 6.60801L9.3585 1.10801C9.72516 0.741341 10.3057 0.741341 10.6418 1.10801L16.1418 6.60801C16.5085 6.97467 16.5085 7.55523 16.1418 7.89134C15.9585 8.07467 15.7446 8.16634 15.5002 8.16634Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M16.3557 19.1659H3.64461C2.08627 19.1659 0.833496 17.9131 0.833496 16.3548V12.6882C0.833496 12.1687 1.23072 11.7715 1.75016 11.7715C2.26961 11.7715 2.66683 12.1687 2.66683 12.6882V16.3548C2.66683 16.9048 3.09461 17.3326 3.64461 17.3326H16.3557C16.9057 17.3326 17.3335 16.9048 17.3335 16.3548V12.6882C17.3335 12.1687 17.7307 11.7715 18.2502 11.7715C18.7696 11.7715 19.1668 12.1687 19.1668 12.6882V16.3548C19.1668 17.9131 17.914 19.1659 16.3557 19.1659Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M10.0002 14.4911C9.48072 14.4911 9.0835 14.0939 9.0835 13.5744V2.72721C9.0835 2.20777 9.48072 1.81055 10.0002 1.81055C10.5196 1.81055 10.9168 2.20777 10.9168 2.72721V13.5744C10.9168 14.0939 10.5196 14.4911 10.0002 14.4911Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect
                                                                width="18.3333"
                                                                height="18.3333"
                                                                fill="white"
                                                                transform="translate(0.833496 0.833008)"
                                                            ></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div class="ml-3">
                                                <div
                                                    class="
                                                        doc-title
                                                        text-truncate
                                                    "
                                                >
                                                    Essay.doc
                                                </div>
                                                <div class="doc-size">
                                                    570 kb
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-primary fs-14 pointer">
                                            <strong>View</strong>
                                        </div>
                                    </div>
                                    <div
                                        class="
                                            upload-doc-wrapper
                                            w-max-100
                                            justify-content-between
                                            mb-3
                                        "
                                    >
                                        <div class="d-flex align-items-center">
                                            <div class="icon-wrapper">
                                                <svg
                                                    class="icon"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0)">
                                                        <path
                                                            d="M15.5002 8.16634C15.2557 8.16634 15.0418 8.07467 14.8585 7.89134L10.0002 3.03301L5.14183 7.89134C4.77516 8.25801 4.19461 8.25801 3.8585 7.89134C3.49183 7.52467 3.49183 6.94412 3.8585 6.60801L9.3585 1.10801C9.72516 0.741341 10.3057 0.741341 10.6418 1.10801L16.1418 6.60801C16.5085 6.97467 16.5085 7.55523 16.1418 7.89134C15.9585 8.07467 15.7446 8.16634 15.5002 8.16634Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M16.3557 19.1659H3.64461C2.08627 19.1659 0.833496 17.9131 0.833496 16.3548V12.6882C0.833496 12.1687 1.23072 11.7715 1.75016 11.7715C2.26961 11.7715 2.66683 12.1687 2.66683 12.6882V16.3548C2.66683 16.9048 3.09461 17.3326 3.64461 17.3326H16.3557C16.9057 17.3326 17.3335 16.9048 17.3335 16.3548V12.6882C17.3335 12.1687 17.7307 11.7715 18.2502 11.7715C18.7696 11.7715 19.1668 12.1687 19.1668 12.6882V16.3548C19.1668 17.9131 17.914 19.1659 16.3557 19.1659Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                        <path
                                                            d="M10.0002 14.4911C9.48072 14.4911 9.0835 14.0939 9.0835 13.5744V2.72721C9.0835 2.20777 9.48072 1.81055 10.0002 1.81055C10.5196 1.81055 10.9168 2.20777 10.9168 2.72721V13.5744C10.9168 14.0939 10.5196 14.4911 10.0002 14.4911Z"
                                                            fill="#1070B7"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect
                                                                width="18.3333"
                                                                height="18.3333"
                                                                fill="white"
                                                                transform="translate(0.833496 0.833008)"
                                                            ></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div class="ml-3">
                                                <div
                                                    class="
                                                        doc-title
                                                        text-truncate
                                                    "
                                                >
                                                    Essay.doc
                                                </div>
                                                <div class="doc-size">
                                                    570 kb
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-primary fs-14 pointer">
                                            <strong>View</strong>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="
                                        col-md-5 col-lg-12 col-xl-5
                                        mt-3 mt-md-0 mt-lg-3 mt-xl-0
                                    "
                                >
                                    <div
                                        class="
                                            form-control
                                            font-family_brown
                                            h-auto
                                            w-100
                                            bg-grayish-blue
                                            p-3
                                        "
                                    >
                                        <div class="fs-12 text-light mb-2">
                                            Comment
                                        </div>
                                        <div class="fs-14 line-height-170p">
                                            Opera refers to a dramatic art form,
                                            originating in Europe, in which the
                                            emotional content is conveyed to the
                                            audience as much through music, both
                                            vocal and instrument...
                                            <span class="pointer text-primary"
                                                >more</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
    <div class="my-5 pt-5 pb-4 text-center">
      <slot></slot>
    </div>
    <div
      v-if="statusInfo !== ''"
      class="
        fs-12
        mt-3
        text-light
        line-height-100p
        d-flex
        align-items-center
        justify-content-center
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 28 28"
        class="iconify mr-1"
        data-inline="false"
        data-icon="fluent:info-28-filled"
        style="transform: rotate(360deg)"
      >
        <g fill="none">
          <path
            d="M2 14c0 6.627 5.373 12 12 12s12-5.373 12-12S20.627 2 14 2S2 7.373 2 14zm13.25-6a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM14 11a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0v-8a1 1 0 0 1 1-1z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
      {{ statusInfo }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: () => '',
    },
    status: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    statusInfo() {
      if (this.status === 'new') {
        return 'Your Exercise will begin once you click the button'
      }
      if (this.status === 'submitted') {
        return 'This exercise has not been graded yet'
      }
      return ''
    },
  },
}
</script>
