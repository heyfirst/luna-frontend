import React from 'react'
import TopicService from '../../services/TopicService'
import Avatar from '../Core/Avatar'
import { Icon, message } from 'antd'

class TopicAdd extends React.Component {
  state = {
    logo: null,
    logoUrl: null,
    topicName: '',
    desc: ''
  }

  onSubmit = async e => {
    e.preventDefault()
    if (this.state.logo === null) {
      message.error('กรุณาใส่รูปประกอบหัวข้อการเรียนรู้')
      return
    }

    message.loading('กำลังสร้างหัวข้อการเรียนรู้..', 10)

    let topic = await TopicService.createTopic(
      this.state.topicName,
      this.state.desc,
      this.state.logo
    ).then(resp => resp.data)

    await Promise.all(
      [1, 2, 3].map(async level => {
        await TopicService.createTopicLevel(topic.pk, level)
      })
    )
    message.destroy()
    message.success('สร้างหัวข้อการเรียนรู้เรียบร้อย')
    await this.props.fetchData()
    await this.props.onClose()
  }

  handleUpload = async e => {
    e.persist()
    const file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.setState({
        logoUrl: [reader.result],
        logo: file
      })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.onSubmit(e)}>
          <div className="text-center">
            <Avatar src={this.state.logoUrl} />
            <div className="mt-2">
              <input
                type="file"
                name="logo"
                id="upload-topic-logo-file"
                className="d-none"
                onChange={e => this.handleUpload(e)}
              />
              <button
                className="btn btn-luna"
                type="button"
                loading={this.state.loading ? 'true' : 'false'}
                onClick={() => {
                  document.getElementById('upload-topic-logo-file').click()
                }}
              >
                <Icon type="upload" /> {this.state.loading ? 'กำลังอัปโหลด' : 'อัปโหลด'}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">ชื่อหัวข้อการเรียนรู้</label>
            <input
              type="text"
              name="topicName"
              className="form-control"
              required
              onChange={e => this.setState({ topicName: e.target.value })}
              value={this.state.topicName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">รายละเอียดหัวข้อการเรียนรู้</label>
            <input
              type="text"
              name="desciption"
              className="form-control"
              required
              onChange={e => this.setState({ desc: e.target.value })}
              value={this.state.desc}
            />
          </div>
          <button className="btn btn-luna btn-block">เพิ่มหัวข้อการเรียนรู้</button>
        </form>
      </div>
    )
  }
}

export default TopicAdd
