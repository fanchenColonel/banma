<template>
  <div id="home">
    <!-- 登录注册页 -->
    <div class="h1"></div>
    <!-- <div class="homeBox">
      <div class="content">
        <p>系统登录</p>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ],
                },
              ]"
              placeholder="Username"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ],
                },
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox
              class="checkbox"
              v-decorator="[
                'remember',
                {
                  valuePropName: 'checked',
                  initialValue: true,
                },
              ]"
            >
              记住密码
            </a-checkbox>

            <a-button
              type="primary"
              class="login-form-button"
              html-type="submit"
              >登录</a-button
            >

            <router-view />
          </a-form-item>
        </a-form>
      </div>
    </div> -->
  </div>
</template>

<script>
// 引入login.js文件，
// import { doLogin } from "../api/login";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      // form: this.$form.createForm(this),
      // userName: "",
      // password: "",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
  },
};
</script>
<style lang="less">
#home {
  // background: url(../) no-repeat;
  background-size: cover;
  height: 100vh;

  .homeBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // min-width: auto;
  }
  .h1 {
    height: 80px;
  }
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 40px;
  }
  .content {
    width: 450px;
    height: 350px;
    margin-top: 20px;
    background-color: #fff;
    padding: 0 50px;
  }
  p {
    text-align: center;
    font-size: 20px;
    height: 70px;
    line-height: 70px;
    margin: 0;
    font-weight: 600;
  }
  form {
    display: flex;
    flex-direction: column;
    input {
      border: 1px solid rgb(214, 214, 214);
      border-radius: 5px;
      height: 50px;
      padding-left: 20px;
    }
  }
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login.ant-input {
  height: 40px;
}
.login-form-button {
  width: 100%;
  height: 40px;
  font-size: 18px;
  margin-top: 30px;
}
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  height: 40px;
}
.checkbox {
  width: 96px;
}
</style>



