<template>
    <div id="login">
        <div class="logoName">
            <img src="@/assets/img/logo.svg" alt="" class="logoImg" />
            <span class="name">重大活动检查系统</span>
            <p class="title">企业级 快速开发平台</p>
            <p class="header"><span>账号密码登录</span></p>
        </div>

        <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
            <a-form-item>
                <a-input
                    v-decorator="[
                        'userName',
                        {
                            rules: [{ required: true, message: '请输入用户名!' }]
                        }
                    ]"
                    placeholder="用户名"
                >
                    <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-decorator="[
                        'password',
                        {
                            rules: [{ required: true, message: '请输入密码!' }]
                        }
                    ]"
                    type="password"
                    placeholder="密码"
                >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-checkbox
                    v-decorator="[
                        'remember',
                        {
                            valuePropName: 'checked',
                            initialValue: true
                        }
                    ]"
                >
                    记住密码
                </a-checkbox>
                <!-- <a class="login-form-forgot" href=""> Forgot password </a> -->
                <a-button type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
                <!-- <a href=""> register now! </a> -->
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
import { doLogin, getToken, getUrlList } from '../api/login';

export default {
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    doLogin({
                        username: values.userName,
                        password: values.password
                    })
                        .then((res) => {
                            if (res.success) {
                                // localStorage.token = res.result.token;
                                sessionStorage.token = res.result.token;
                                localStorage.userInfo = res.result.userInfo;
                                this.$router.push({ path: '/menus' });
                            }
                        })
                        .catch((err) => {
                            this.$message.error(err);
                        });
                }
            });
        }
    }
};
</script>
<style lang="less">
p {
    margin: 0;
}
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
    float: right;
}
#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
#login {
    background: url(../assets/img/backG.svg) no-repeat 50%;
    min-height: 100%;
    background-size: 100%;
    background-color: rgb(240, 242, 245);
    padding: 110px 0 144px;
    height: 100vh;
    .login-form {
        width: 368px;
        margin: 0 auto;
    }
    .h1 {
        height: 110px;
    }
    .logoName {
        text-align: center;
        .title {
            margin: 12px 0 40px;
        }
    }
    .logoImg {
        width: 44px;
        height: 44px;
    }
    .name {
        vertical-align: -7px;
        margin-left: 16px;
        font-size: 32px;
        font-weight: 600;
    }
    .header {
        width: 368px;
        margin: 0 auto;
        height: 44px;
        color: #1890ff;
        margin-bottom: 16px;
        span {
            height: 44px;
            display: inline-block;
            padding: 12px 16px;
            border-bottom: 2px solid #1890ff;
        }
    }
}
</style>