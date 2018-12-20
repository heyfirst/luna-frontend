import React from 'react'
import { observer } from 'mobx-react'
import TopicCard from '../Topic/TopicCard'
import TopicService from '../../services/TopicService'
import styled from 'styled-components'
import { Modal } from 'antd'
import TopicAdd from './TopicAdd'
import TopicEdit from './TopicEdit'
import store from './store'

const DivCard = styled.div`
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.625rem !important;
  margin-bottom: 1.25rem;
  filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1));
`

@observer
class TopicList extends React.Component {
  state = {
    topics: []
  }

  async componentWillMount() {
    await this.fetchTopic()
  }

  fetchTopic = async () => {
    const topics = await TopicService.getAllTopic().then(resp => resp.data)
    this.setState({
      topics
    })
  }

  render() {
    return (
      <div>
        <div className="row mb-2">
          <div className="col text-white d-flex align-items-center">
            มีหัวข้อการเรียนรู้ทั้งหมด {this.state.topics.length} ข้อ ... คลิกที่
            <u>กล่องหัวข้อการเรียนรู้</u>
            เพื่อแก้ไข
          </div>
          <div className="col text-right">
            <button className="btn btn-luna" onClick={() => store.setAddModal(true)}>
              เพิ่มหัวข้อ
            </button>
          </div>
        </div>
        <div className="row">
          {this.state.topics.map(topic => (
            <div className="col-12" key={topic.pk}>
              <DivCard className="card w-100 border-0">
                <a onClick={() => store.setEditModal(true, topic.pk)}>
                  <TopicCard topic={topic} isTopicPage />
                </a>
              </DivCard>
            </div>
          ))}
        </div>
        {/* Modal Zone */}
        <Modal
          title={`เพิ่มหัวข้อการเรียนรู้`}
          visible={store.addModal}
          onCancel={() => store.setAddModal(false)}
          footer={null}
        >
          {store.addModal && (
            <TopicAdd onClose={() => store.setAddModal(false)} fetchData={this.fetchTopic} />
          )}
        </Modal>
        <Modal
          title={`แก้ไขหัวข้อการเรียนรู้`}
          visible={store.editModal}
          onCancel={() => store.setEditModal(false, null)}
          footer={null}
        >
          {store.editModal && (
            <TopicEdit
              onClose={() => store.setEditModal(false, null)}
              fetchData={this.fetchTopic}
              topicId={store.editTopicId}
            />
          )}
        </Modal>
      </div>
    )
  }
}

export default TopicList
