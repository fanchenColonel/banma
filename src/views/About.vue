<template>
    <div>
        <div>
            <div class="clearfix">
                <!-- @preview="handlePreview"
                @change="handleImage"-->
                <a-upload
                    list-type="picture-card"
                    :file-list="fileLists"
                    :before-upload="beforeUpload"
                    :remove="handleFileRemove"
                >
                    <div v-if="fileLists.length < 8">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">点击上传</div>
                    </div>
                </a-upload>
            </div>
            <div>
                <a-upload
                    name="file"
                    :multiple="true"
                    :headers="headers"
                    :file-list="fileLists"
                    :before-upload="beforeUpload"
                    :remove="handleFileRemove"
                >
                    <a-button>
                        <a-icon type="upload" />点击上传
                    </a-button>
                </a-upload>
            </div>
        </div>
    </div>
</template>
<script>
// import reqwest from 'reqwest';

import { uploading } from '@/api/onlineFormFuncTest';
import { baseUrl } from '@/assets/js/base-url';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
export default {
    data() {
        return {
            fileLists: [],
            previewVisible: false,
            previewImage: ''
        };
    },
    methods: {
        beforeUpload(file) {
            console.log(file);
            file.status = 'uploading';
            this.handleUpload({file});
            return false;
        },
        handleUpload({file}) {
            console.log(file);
            
            const formData = new FormData();

            formData.append('file', file);
            formData.append('biz', '');
            this.uploading = true;
            uploading(formData)
                .then((res) => {
                    file.status = 'done';
                    file.url = baseUrl + '/sys/common/static/' + res.message;
                    this.fileLists = [...this.fileLists, file];
                    console.log(res);
                })
                .catch((e) => {
                    this.$message.error('error:', e);
                });
        },
        handleFileRemove(file) {
            let fileList = [];
            this.fileLists.map((item) => {
                if (!(file.uid == item.uid || item.status == 'removed')) {
                    fileList.push(item);
                }
            });
            this.fileLists = [...fileList];
        }
    }
};
</script>
<style lang="less">
</style>