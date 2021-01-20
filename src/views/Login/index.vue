<template>
  <div class="login">
    <div class='login-box'>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">      
        <el-form-item  label="手机号" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" placeholder='请输入网易云音乐手机号'></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder='请输入密码'></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>    
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name:'Login',
  data() {
    var validatePhone = (rule, value, callback) => {
      let reg = /^1[0-9]{10}$/;
      if (value === '' || !reg.test(value)) {
        callback(new Error('请输入网易云音乐手机号'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: { phone: '', password: '' },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'blur' }],        
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    };
  },
  methods: {
    ...mapMutations({
      setUserInfo:'SET_USERINFO',
      setToken:'SET_TOKEN'
    }),
    submitForm(formPhone) {
      this.$refs[formPhone].validate((valid) => {
        if (valid) {
          // 如果表单验证通过，请求登录接口
          this.login(this.ruleForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formPhone) {
      this.$refs[formPhone].resetFields();
    },
    login({phone,password}){
      this.$api.login({ phone,password }).then(res => {
        if(res.code === 200){
          const userInfo = res.profile;
          localStorage.setItem('token',JSON.stringify(res.token));
          localStorage.setItem('cookie',JSON.stringify(res.cookie));
          this.setUserInfo(userInfo);
          this.setToken(res.token);
          // this.$message.success('登录成功！将在2秒后自动跳转到主页。。')
          // this.$message({
          //   type:'success',
          //   message:'登录成功！将在2秒后自动跳转到主页。。'
          // })

          this.$router.push('/main');
          // setTimeout(() => {
          //   this.$router.push('/main')
          // },2000);
        }else{
          this.$message('手机号或者密码好像不对。。。')
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login{
  width: 100%;
  height: 100%;
  background:url('../../assets/img/login_bg.jpg') no-repeat center;
  background-size:cover;
  .login-box{
    width: 400px;
    height: 300px;
    margin:0 auto;
    padding-top: 250px;
    .submit{
      margin-left:50%;
      transform: translateX(-50%);
    }
  }
}
</style>