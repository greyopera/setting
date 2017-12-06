define([
    'jquery',
    'parseURL',
    'Mustache',
    'factory/space/space.helper',
    'factory/space/write/space.write',
    'tinyMCE',
    'text!./question1.mustache',
    'text!./question2.mustache',
    'text!./question3.mustache'
], function ($, parseURL, Mustache, spaceHelper, spaceWrite, tinyMCE, question1Template, question2Template, question3Template) {
    "use strict";

    var GET_URL = parseURL(document.URL),
        $spaceBbs = $("#spaceBbs"),
        imageUploadUrl = $spaceBbs.data('image-upload-url'),
        $spaceBbsWriteBoardFunctionSubmit,
        spaceType = 1,
        getParameter = GET_URL.pathname.split('/'),
        PAGE_ID = getParameter[getParameter.length - 1];

    var viewUrl = $spaceBbs.data('viewUrl').split('/'),
        combineUrl = viewUrl[viewUrl.length - 1].split('?');

    combineUrl[0] = combineUrl[0] + '/' + PAGE_ID;
    combineUrl = combineUrl.join('?');

    viewUrl[viewUrl.length - 1] = combineUrl;
    viewUrl = viewUrl.join('/');

    for(var idx in GET_URL.searchObject) if(GET_URL.searchObject[idx]['space_type']) spaceType = GET_URL.searchObject[idx]['space_type'];

    function submit(e) {

        e.preventDefault();

        var $registerForm = $("[name='spaceBbsWriteBoardForm']"),
            params = $registerForm.serializeObject(),
            $tinyContentImage = $($.parseHTML(tinyMCE.activeEditor.getContent())).find('img');

        if(params.is_notice && params.is_notice == 'on') params.is_notice = true;
        params.id = PAGE_ID;
        params.image_array = [];

        $tinyContentImage.each(function(idx) { params.image_array.push( $(this).data('id') ) });

        spaceWrite
            .register(params)
            .then(function(res) {

                if(res.status != false) {
                   $spaceBbs.find('.space_bbs__write__board__function .list').get(0).click();
                }

            }).catch(function(res) {
                alert(res);
            })

    }

    function modify(e) {

        e.preventDefault();

        var $registerForm = $("[name='spaceBbsWriteBoardForm']"),
            params = $registerForm.serializeObject(),
            $tinyContentImage = $($.parseHTML(tinyMCE.activeEditor.getContent())).find('img');

        if(params.is_notice && params.is_notice == 'on') {
            params.is_notice = true;
        } else {
            params.is_notice = false;
        }

        params.id = PAGE_ID;
        params.image_array = [];

        $tinyContentImage.each(function(idx) { params.image_array.push( $(this).data('id') ) });

        
        spaceWrite
            .modify(params)
            .then(function(res) {

                if(res.status != false) {
                  location.href = viewUrl;
                }

            }).catch(function(res) {
                alert(res);
            });

    }

    function imageUpload(e) {

        e.preventDefault();

        var $self = $(this),
            $form = $self.closest('form'),
            $submit = $form.find('[type=submit]'),
            form = $form[0],
            data = new FormData(form);

        // If you want to add an extra field for the FormData
        // data.append("CustomField", "This is some extra data, testing");

        $submit.prop("disabled", true);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: imageUploadUrl,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,

            success: function (data) {

                tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), 'img', { 'class': 'image', 'src': data.space_image_url, 'data-id': data.image_id });
                tinyMCE.activeEditor.windowManager.close();

                tinymce.triggerSave();
                //$textarea.val(tinymce.activeEditor.getContent());

                $submit.prop("disabled", false);
                $self.prop("value", "");

            },
            error: function (e) {

                throw new Error("ERROR : ", e);
                $submit.prop("disabled", false);
                $self.prop("value", "");

            }
        });

    }

    function fileUpload(e) {
        e.preventDefault();

        var data = new FormData();

        data.append('file', e.target.files[0]);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: imageUploadUrl,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,

            success: function (data) {
                document.getElementById('fileid').value = data.file_id
            },
            error: function (e) {
                throw new Error("ERROR : ", e);
            }
        });
    }

    function controller(opts) {

        var tinyCallback = (opts && opts.tinyCallback) ? opts.tinyCallback : null,
            $imageUploadButton = $("#fileUploadForm input[type=file]"),
            tinymceOptions = {

                setup: function (editor) {
                    editor.on('change', function (e) {
                        tinymce.triggerSave();
                    });

                    editor.on('init', function(args) {
                        if(tinyCallback) tinyCallback();
                    });
                },
                content_css : '/static/css/tinymce.space.css',
                formats: {
                    alignleft: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left'},
                    aligncenter: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center'},
                    alignright: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right'},
                    alignjustify: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full'},
                    bold: {inline: 'span', 'classes': 'bold'},
                    italic: {inline: 'span', 'classes': 'italic'},
                    underline: {inline: 'span', 'classes': 'underline', exact: true},
                    strikethrough: {inline: 'del'},
                    forecolor: {inline: 'span', classes: 'forecolor', styles: {color: '%value'}},
                    hilitecolor: {inline: 'span', classes: 'hilitecolor', styles: {backgroundColor: '%value'}},
                    custom_format: {block: 'h1', attributes: {title: 'Header'}, styles: {color: 'red'}}
                },
                style_formats: [
                    {
                        title: 'Headers',
                        items: [
                            {title: 'Header 1', format: 'h1'},
                            {title: 'Header 2', format: 'h2'},
                            {title: 'Header 3', format: 'h3'},
                            {title: 'Header 4', format: 'h4'},
                            {title: 'Header 5', format: 'h5'},
                            {title: 'Header 6', format: 'h6'}
                        ]
                    },
                    {
                        title: 'Inline',
                        items: [
                            {title: 'Bold', icon: 'bold', format: 'bold'},
                            {title: 'Italic', icon: 'italic', format: 'italic'},
                            {title: 'Underline', icon: 'underline', format: 'underline'},
                            {title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough'},
                            {title: 'Superscript', icon: 'superscript', format: 'superscript'},
                            {title: 'Subscript', icon: 'subscript', format: 'subscript'},
                            {title: 'Code', icon: 'code', format: 'code'}
                        ]
                    },
                    {
                        title: 'Blocks',
                        items: [
                            {title: 'Paragraph', format: 'p'},
                            {title: 'Blockquote', format: 'blockquote'},
                            {title: 'Div', format: 'div'},
                            {title: 'Pre', format: 'pre'}
                        ]
                    },
                    {
                        title: 'Alignment',
                        items: [
                            {title: 'Left', icon: 'alignleft', format: 'alignleft'},
                            {title: 'Center', icon: 'aligncenter', format: 'aligncenter'},
                            {title: 'Right', icon: 'alignright', format: 'alignright'},
                            {title: 'Justify', icon: 'alignjustify', format: 'alignjustify'}
                        ]
                    }
                ],
                style_formats_merge: true,
                language: 'ko_KR',
                branding: false, // Powered by TinyMCE Message
                hidden_input: true,
                selector: 'textarea',
                height: 500,
                // file_browser_callback: function (field_name, url, type, win) {
                //         console.log(field_name, url, type, win);
                //         if(type=='image') {
                //         $('#my_form input').click();
                //     }
                // },
                file_picker_callback: function (callback, value, meta) { // 첨부 버튼 눌렀을 때 콜백.

                    if (meta.filetype == 'file') {
                        // callback('mypage.html', {text: 'My text'});
                    }

                    // Provide image and alt text for the image dialog
                    if (meta.filetype == 'image') {

                        $imageUploadButton.click();
                    }

                    // Provide alternative source and posted for the media dialog
                    if (meta.filetype == 'media') {
                        // callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                    }
                },
                init_instance_callback: function (editor) {
                    // console.log("Editor: " + editor.id + " is now initialized.");
                    $imageUploadButton.on('change', imageUpload);
                },

                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen textcolor',
                    'insertdatetime media table contextmenu paste code help'
                ],
                toolbar: 'code undo redo copy cut | link image | fontsizeselect fontselect | forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
            };

        $spaceBbs.on('click', '.space_bbs__write__board__function .register', submit);
        $spaceBbs.on('click', '.space_bbs__write__board__function .modify', modify);
        $spaceBbs.on('change', '#uploadFile', fileUpload);
        
        // 글쓰기 Template
        return spaceWrite
            .setContext('#spaceBbs')
            .getWrite()
            .then(function (res) {
                
                if(opts && opts.modify == true) spaceWrite.setTemplate(true);
                else spaceWrite.setTemplate();

                tinyMCE.init(tinymceOptions);
                $spaceBbsWriteBoardFunctionSubmit = $("#spaceBbsWriteBoardFunctionSubmit");

                if (spaceType == 1) {
                    $('[name=description]').val(Mustache.render(question1Template));
                } else if (spaceType == 2){
                    $('[name=description]').val(Mustache.render(question2Template));
                } else if (spaceType == 3){
                    $('[name=description]').val(Mustache.render(question3Template));
                }
                
                $('#space_type').change(function(){
                    var num = $(this).val();
                    if(num == 1){
                        tinyMCE.activeEditor.setContent(Mustache.render(question1Template))
                    } else if (num == 2) {
                        tinyMCE.activeEditor.setContent(Mustache.render(question2Template))
                    } else {
                        tinyMCE.activeEditor.setContent(Mustache.render(question3Template))
                    }
                });

            });

    }

    return controller;
});