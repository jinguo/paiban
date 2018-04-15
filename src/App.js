import React, { Component } from 'react';
import { Modal, Radio, Upload, Button, Icon } from 'antd';
import * as qiniu from 'qiniu-js'
import axios from 'axios'
import './App.css';

const RadioGroup = Radio.Group;

class App extends Component {
  state = {
    visible: false,
    value: 1,
    fileLength: 0
  }
  componentDidMount() {
    var myfile = document.getElementById('file');
    var that = this;
    myfile.onchange = function (event) {
      const filesList = event.target.files;
      const config = {
        useCdnDomain: true,
        region: qiniu.region.z0
      };
      let token = '';
      var observer = {
        next(res) {
          // ...
          console.log('next', res)
        },
        error(err) {
          // ...
          console.log('error', err)
        },
        complete(res) {
          // ...
          console.log('res', res)
        }
      }
      that.setState({fileLength: filesList.length})
      for (let i = 0; i < filesList.length; i++) {
        const key = filesList[i].name;
        const file = filesList[i];
        const putExtra = {
          fname: filesList[i].name,
          params: {},
          mimeType: [] || null
        };
        axios.post('http://192.168.12.106:3100/getqntoken', { fileName: key }).then(res => {
          token = res.data.token;
          const observable = qiniu.upload(file, key, token, putExtra, config)
          var subscription = observable.subscribe(observer)
        })
      }
    }
  }
  // 模板选择弹框确认
  handleOk = () => {
    this.setState({
      visible: false
    })
  }
  // 模板选择弹框取消
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  handleChooseTemplete = () => {
    this.setState({
      visible: true
    })
  }
  handleCreateResult = () => {
    const tpl1 =  '<div style="width: 750px; margin: 0 auto"><div style="text-align: center; margin-top: 40px"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF1%E7%B4%A0%E6%9D%901.png" style="width: 350px" /></div><div style="margin: 40px 0"><img id="img1" src="http://assets.janggwa.cn/1(1).jpg" style="width: 750px" /></div><div style="text-align: right"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF1%E7%B4%A0%E6%9D%902.png" style="width: 148px; margin-right: 48px" /></div><div style="display: flex;justify-content: space-between;align-items: center"><div><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF1%E7%B4%A0%E6%9D%903.png" style="width: 130px; margin-left:24px" /></div><div><div style="margin: 40px 0; text-align: right"><img id="img2" src="http://assets.janggwa.cn/1(2).jpg" style="width: 560px" /></div><div style="margin: 40px 0; text-align: right"><img id="img3" src="http://assets.janggwa.cn/1(3).jpg" style="width: 560px" /></div></div></div><div style="margin: 0 0 40px"><img id="img4" src="http://assets.janggwa.cn/1(4).jpg" style="width: 750px" /></div><div style="text-align: center; margin: 40px 0"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF1%E7%B4%A0%E6%9D%904.png" style="width: 384px" /></div><div style="display: flex;align-items: center"><img id="img5" src="http://assets.janggwa.cn/1(5).jpg" style="width: 556px" /><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF1%E7%B4%A0%E6%9D%905.png" style="width: 184px;margin-left: 10px" /></div><div style="margin-top: 40px"><img id="img6" src="http://assets.janggwa.cn/1(6).jpg" style="width: 750px" /></div></div>';
    const tpl2 = '<div style="width: 750px; margin: 0 auto; padding: 80px 0 150px"><div><img id="img1" src="http://assets.janggwa.cn/1(1).jpg" style="width: 750px" /></div><div style="text-align: center; margin: 40px 0"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF2%E7%B4%A0%E6%9D%901.png?t" style="width: 310px" /></div><div style="text-align: right"><img id="img2" src="http://assets.janggwa.cn/1(2).jpg" style="width: 560px" /></div><div style="display: flex;justify-content: flex-start; margin-top: 60px"><div><img id="img3" src="http://assets.janggwa.cn/1(3).jpg" style="width: 560px" /></div><div style="margin-left: 70px"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF2%E7%B4%A0%E6%9D%902.png" style="width: 24px" /></div></div><div style="margin-top: 30px;"><div><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF2%E7%B4%A0%E6%9D%903.png" style="width: 480px" /></div></div><div style="margin-top: 50px"><img id="img4" src="http://assets.janggwa.cn/1(4).jpg" style="width: 750px" /></div><div style="margin-top: 80px; text-align: right"><img id="img5" src="http://assets.janggwa.cn/1(5).jpg" style="width: 630px" /></div><div style="margin-top: 20px; text-align: right"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF2%E7%B4%A0%E6%9D%904.png" style="width: 400px" /></div><div style="margin-top: 60px"><img id="img6" src="http://assets.janggwa.cn/1(6).jpg" style="width: 750px" /></div><div style="position: relative; margin-top: 60px"><img id="img7" src="http://assets.janggwa.cn/1(7).jpg" style="width: 620px" /><div style="position: absolute; bottom: -60px; right: 10px;"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF2%E7%B4%A0%E6%9D%905.png" style="width: 430px" /></div></div><div style="margin-top: 80px"><img id="img8" src="http://assets.janggwa.cn/1(8).jpg" style="width: 750px" /></div><div style="margin-top: 30px; text-align: center"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF2%E7%B4%A0%E6%9D%906.png" style="width: 410px" /></div><div style="margin-top: 20px"><img id="img9" src="http://assets.janggwa.cn/1(9).jpg" style="width: 750px" /></div><div style="margin-top: 60px; text-align: center"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF2%E7%B4%A0%E6%9D%908.png" style="width: 210px" /></div><div style="margin-top: 20px; text-align: center"><img id="img10" src="http://assets.janggwa.cn/1(10).jpg" style="width: 650px" /></div><div style="margin-top: 40px; text-align: center"><img id="img11" src="http://assets.janggwa.cn/1(11).jpg" style="width: 650px" /></div><div style="margin-top: 40px; text-align: center"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF2%E7%B4%A0%E6%9D%908.png" style="width: 210px" /></div><div style="margin-top: 60px"><img id="img12" src="http://assets.janggwa.cn/1(12).jpg" style="width: 750px" /></div><div style="display: flex; margin-top: 60px;"><div style="margin-left: 40px"><img id="img13" src="http://assets.janggwa.cn/1(13).jpg" style="width: 480px" /></div><div style="margin-left: 70px;"><img src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF2%E7%B4%A0%E6%9D%907.png" style="width: 80px" /></div></div><div style="margin-top: 80px"><img id="img14" src="http://assets.janggwa.cn/1(14).jpg" style="width: 750px" /></div></div>'
    document.querySelector('.result').innerHTML = this.state.value === 1 ? tpl1: tpl2;
    let j = 0;
    for(let i=0;i < this.state.fileLength; i++) {
      if(document.getElementById(`img${i}`)) {
        document.getElementById(`img${i}`).src = `http://assets.janggwa.cn/1(${i}).jpg?t=${new Date()}`;
      }
    }
  }
  handleCreateCode = () => {
    const code  = document.querySelector('.result').innerHTML;
    document.querySelector('.result').innerText = code;
  }
  render() {
    return (
      <div className="App">
        <div className="result" />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ marginRight: 20 }} onClick={this.handleChooseTemplete}>选择模板</Button>
          <Modal
            className="templete-modal"
            title="请选择需要使用的模板"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <RadioGroup onChange={this.onChange} value={this.state.value}>
              <Radio value={1}>
                <img className={this.state.value === 1 ? 'templete-img actived' : 'templete-img'} src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF1.png" alt="img" />
              </Radio>
              <Radio value={2}>
                <img className={this.state.value === 2 ? 'templete-img actived' : 'templete-img'} src="http://assets.janggwa.cn/%E6%A8%A1%E6%9D%BF1.png" alt="img" />
              </Radio>
            </RadioGroup>
          </Modal>
          <input id="file" type="file" multiple="true" />
          <Button style={{ marginLeft: 20, display: 'inline-block' }} onClick={this.handleCreateResult}>预览</Button>
          <Button style={{ marginLeft: 20, display: 'inline-block' }} onClick={this.handleCreateCode}>生成代码</Button>
        </div>
      </div>
    );
  }
}

export default App;
