<template>
    <div id="UploadProducts">
        <div class="submit-products">
            <input type="text" placeholder="categoryId" v-model="product.categoryId">
            <input type="text" placeholder="name"  v-model="product.name">
            <input type="text" placeholder="subtitle" v-model="product.subtitle">
            <input type="text" placeholder="detail" v-model="product.detail">
            <input type="text" placeholder="price" v-model="product.price">
            <input type="text" placeholder="stock" v-model="product.stock" >
            <input type="text" placeholder="status" v-model="product.status">
            <input type="text" placeholder="mainImage" v-model="product.mainImage">
            <input type="text" placeholder="subImages" v-model="product.subImages">
            <el-upload
                    style="margin-top: 20px"
                    class="upload-demo"
                    drag
                    :action="upLoadUrl"
                    :with-credentials = true
                    :on-success="loadSuccess"
                    :on-error="loadError"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <input type="submit" value="提交" @click="submitProduct()"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UploadProducts",
        data() {
            return {
                product: {
                    categoryId: '',
                    name: '',
                    subtitle: '',
                    detail: '',
                    price: '',
                    stock: '',
                    status: '',
                    mainImage: '',
                    subImages: '',
                },
                upLoadUrl: this.$axios.defaults.baseURL+'/admin/product/upload.do',
            }
        },
        methods: {
            loadSuccess(response, file, fileList) {
                console.log(response.data);
                if(response.data.status == 1){
                    alert(response.data);
                }
                var data= response.data;
                if( this.product.mainImage.trim() == ""){
                    this.product.mainImage=";"+data.url+'pserver/picture/'+data.uri;
                }else{
                    this.product.subImages+=";"+data.url+'pserver/picture/'+data.uri;
                }

                //内部约定

            },
            loadError() {
                alert("上传失败，网络不行哦");
            },
            submitProduct(){
                this.$axios.post("/admin/product/productSave.do",this.qs.stringify(
                    this.product
                )).then(response =>{
                    console.log(response.data)
                }).catch(response =>{

                })
            }
        }
    }
</script>

<style scoped>
    #UploadProducts {

    }

    #UploadProducts .submit-products {
        width: 400px;
        height: auto;
        padding-top: 10px;
        /*background-color: greenyellow;*/
        margin: 0 auto;
    }

    #UploadProducts .submit-products input {
        width: 360px;
        margin-top: 10px;
        display: block;
    }
</style>