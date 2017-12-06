define([
    'vue',
    'vueResource',
    'vueHead',
    'controller/global.vue.mixins',
    'jquery'
], function (Vue, VueResource, VueHead, mixins, $) {
    "use strict";

    function controller() {

        Vue.use(VueResource);
        Vue.use(VueHead);

        new Vue({

            el: '#vue-app',

            delimiters: ['[[', ']]'],

            mixins: [ mixins.filterMixin ],

            head: {
                /**
                 * 데이블 메타 태그
                 * vue-head.js 사용: https://github.com/ktquez/vue-head 참고
                 * 주의사항: data에 meta에 사용할 빈 껍데기를 미리 선언해놓지 않으면 undefined 오류가 발생함.
                 */
                meta: function () {
                    var results = [
                        {property: 'og:url', content: window.location.href},
                        {property: 'og:title', content: this.content.subject},
                        {property: 'og:description', content: this.content.subject},
                        {property: 'product:brand', content: this.content.teachers[0].name},
                        {property: 'product:price:currency', content: 'KRW'},
                        {property: 'product:price:amount', content: this.original_price},
                        {property: 'product:sale_price:currency', content: 'KRW'},
                        {property: 'product:sale_price:amount', content: this.content.price},
                        {property: 'product:category', content: 'offline'},
                        {property: 'product:category0', content: this.content.category_list.length > 0 ? this.content.category_list[0] : ''},
                        {property: 'product:category1', content: this.content.category_list.length > 1 ? this.content.category_list[1] : ''},
                        {property: 'product:category2', content: this.content.category_list.length > 2 ? this.content.category_list[2] : ''},
                        {property: 'product:category3', content: this.content.category_list.length > 3 ? this.content.category_list[3] : ''},
                        {property: 'product:category4', content: this.content.category_list.length > 4 ? this.content.category_list[4] : ''},
                        {property: 'product:category5', content: this.content.category_list.length > 5 ? this.content.category_list[5] : ''},
                        {property: 'product:category6', content: this.content.category_list.length > 6 ? this.content.category_list[6] : ''},
                        {property: 'product:category7', content: this.content.category_list.length > 7 ? this.content.category_list[7] : ''},
                        {property: 'product:category8', content: this.content.category_list.length > 8 ? this.content.category_list[8] : ''},
                        {property: 'product:category9', content: this.content.category_list.length > 9 ? this.content.category_list[9] : ''},
                        {property: 'product:category10', content: this.content.category_list.length > 10 ? this.content.category_list[10] : ''},
                        {property: 'product:category11', content: this.content.category_list.length > 11 ? this.content.category_list[11] : ''},
                        {property: 'product:category12', content: this.content.category_list.length > 12 ? this.content.category_list[12] : ''},
                        {property: 'product:category13', content: this.content.category_list.length > 13 ? this.content.category_list[13] : ''},
                        {property: 'product:category14', content: this.content.category_list.length > 14 ? this.content.category_list[14] : ''},
                        {property: 'product:category15', content: this.content.category_list.length > 15 ? this.content.category_list[15] : ''},
                        {property: 'product:category16', content: this.content.category_list.length > 16 ? this.content.category_list[16] : ''},
                        {property: 'product:category17', content: this.content.category_list.length > 17 ? this.content.category_list[17] : ''},
                        {property: 'product:category18', content: this.content.category_list.length > 18 ? this.content.category_list[18] : ''},
                        {property: 'product:category19', content: this.content.category_list.length > 19 ? this.content.category_list[19] : ''},
                        {property: 'product:category20', content: this.content.category_list.length > 20 ? this.content.category_list[20] : ''},
                    ];

                    return results;
                }
            },

            data: {
                service: 'weport',
                // 데이블 메타테그를 위해 껍데기 미리 선언
                content: {
                    subject: '',
                    teachers: [{
                        name: ''
                    }],
                    price: 0,
                    category_list: [],
                },
                is_on_load: true,
                active_tab: 1,
                active_teacher: null,

                // 후기 관련
                reviews: [],
                is_review_on_load: true,
                active_review: null,
                reviews_count: 0,
                reviews_score: 0.0,
                review_pages: [],
                review_current_page: 1,
                review_teacher: null,

                // 찾아오시는길
                location_tab: 1,

                // 관련컨텐츠
                related_tab: 1,
            },

            computed: {
                original_price: function () {
                    if (this.content.original_price) {
                        return this.content.original_price;
                    } else {
                        return this.content.price;
                    }
                }
            },

            watch: {
                active_teacher: function () {
                    this.loadTeacherReviews(this.service, this.active_teacher, 0);
                },
            },

            methods: {
                /**
                 * 컨텐츠 로드
                 */
                loadContent: function (service) {

                    var params = {
                        service: service
                    };

                    var content_id = this.$refs.content_id.value;
                    this.is_on_load = true;

                    this.$http.get('/offline/lecture/' + content_id  + '/json', {params: params})
                        .then(function (response) {
                            this.content = response.body;
                            this.is_on_load = false;

                            this.active_teacher = this.content.teachers[0].id;
                            console.log(this.content);

                            /**
                             * 데이블 메타 코드 삽입
                             */
                            this.$emit('updateHead');

                        });
                },

                /**
                 * 선생님 후기 로드
                 */
                loadTeacherReviews: function (service, teacher_id, page) {

                    this.review_current_page = page;

                    var params = {
                        service: service,
                        page: page
                    };

                    // var parent = this;
                    this.is_review_on_load = true;
                    this.$http.get('/offline/teacher-reviews/' + teacher_id + '/json', {params: params})
                        .then(function(response) {

                            this.reviews = response.body.reviews;
                            this.reviews_count = response.body.reviews_count;
                            this.reviews_score = response.body.reviews_score.toFixed(2);
                            this.review_teacher = response.body.teacher;

                            var pages_count = Math.floor(this.reviews_count / 10) + 1;

                            var page_starts = 0;
                            var page_ends = pages_count;

                            if (pages_count > 5) {

                                if (this.review_current_page < 2) {
                                    page_starts = 0;
                                    page_ends = 5;
                                } else if (this.review_current_page + 3 > pages_count) {
                                    page_starts = pages_count - 5;
                                    page_ends = pages_count;
                                } else {
                                    page_starts = this.review_current_page - 2;
                                    page_ends = this.review_current_page + 3;
                                }
                            }

                            var pages = [];
                            for (var i = page_starts; i < page_ends; i++) {
                                pages.push(i);
                            }

                            this.review_pages = pages;

                            this.is_review_on_load = false;
                        });
                },
                scrollTop: function (){
                    $("html, body").animate({
                        scrollTop : 0
                    }, 400);
                    return false;
                },

                openPassLink: function () {
                    window.open(this.content.offline.pass_link);
                },

                /**
                 * 강의 구매하기 페이지로 이동
                 */
                openOrder: function (content_id) {
                    var url = "/payment/order?content_id=" + content_id + "&service=weport"
                    window.open(url);
                },
                handleTeacher: function() {
                    window.open("/about/teachers/" + this.active_teacher);
                },
            },

            /**
             * $document.ready()와 같음
             * 페이지가 로드된 다음에 바로 실행
             */
            mounted: function () {

                this.loadContent('weport');
                // 임시
                this.active_tab = 1;
                document.getElementById('vue-app').style.display = 'block';

            },


        });

    }

    return controller;

});