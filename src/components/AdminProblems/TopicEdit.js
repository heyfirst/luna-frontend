import React from 'react'
import TopicService from '../../services/TopicService'
import Avatar from '../Core/Avatar'
import { Icon, message } from 'antd'

class TopicEdit extends React.Component {
  state = {
    loading: true,
    logo: null,
    logoUrl: null,
    topicName: '',
    desc: ''
  }

  async componentWillMount() {
    this.setState({
      loading: true
    })
    await TopicService.getTopic(this.props.topicId).then(resp => {
      const { data } = resp
      this.setState({
        loading: false,
        logo: null,
        logoUrl: data.logo,
        topicName: data.topic_name,
        desc: data.description
      })
    })
  }

  onSubmit = async e => {
    e.preventDefault()

    message.loading('กำลังอัพเดทหัวข้อการเรียนรู้..', 10)
    await TopicService.updateTopic(
      this.props.topicId,
      this.state.topicName,
      this.state.desc,
      this.state.logo !== null ? this.state.logo : undefined
    ).then(resp => resp.data)

    message.destroy()
    message.success('อัพเดทหัวข้อการเรียนรู้เรียบร้อย')
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
    if (this.state.loading) {
      return <div />
    }
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
                <Icon type="upload" /> {this.state.loading ? 'กำลังอัพโหลด' : 'อัพโหลด'}
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

export default TopicEdit
