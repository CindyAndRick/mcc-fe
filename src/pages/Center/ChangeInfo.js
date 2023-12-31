import React from "react";
import { connect } from "react-redux";
import { setUserInfo } from "../../redux/actionCreator/UserDataCreator";
import { UserAPI } from "../../utils/api";

import { Form, Input, Button, message, Radio } from "antd";

function ChangeInfo(props) {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  let { token, userInfo, setUserInfo, changeView } = props;

  const onFinish = (values) => {
    userUpdate(values);
  };

  const userUpdate = (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("phone", values.phone);
    formData.append("nickname", values.nickname);
    if (values.gender !== undefined) {
      formData.append("gender", values.gender);
    }
    if (values.age !== undefined) {
      formData.append("age", values.age);
    }
    formData.append("history_disease", values.history_disease);
    UserAPI({
      url: "user/update",
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 200) {
        setUserInfo(res.data.data);
        messageApi.open({
          type: "success",
          content: "修改成功，正在跳转...",
        });
        setTimeout(() => {
          changeView(0);
        }, 1000);
      } else {
        messageApi.open({
          type: "error",
          content: "修改失败，请重试",
        });
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          username: userInfo.username,
          phone: userInfo.phone,
          nickname: userInfo.nickname,
          gender: userInfo.gender,
          age: userInfo.age,
          history_disease: userInfo.history_disease,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手机"
          name="phone"
          rules={[
            {
              required: true,
              message: "请输入手机",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="昵称"
          name="nickname"
          rules={[
            {
              required: true,
              message: "请输入昵称",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <Input />
        </Form.Item>
        <Form.Item label="历史疾病" name="history_disease">
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            修改账户信息
          </Button>
          <Button
            type="primary"
            htmlType="button"
            style={{ marginLeft: "20px" }}
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          <Button
            type="primary"
            htmlType="button"
            style={{ marginLeft: "20px" }}
            onClick={() => {
              changeView(0);
            }}
          >
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserDataReducer.userInfo,
    token: state.UserDataReducer.token,
  };
};

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfo);
