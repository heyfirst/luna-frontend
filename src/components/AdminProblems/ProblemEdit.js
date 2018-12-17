import React from 'react'
import Card from '../Core/Card'
import store from './store'
import { Select } from 'antd'
import { observer } from 'mobx-react'

const Option = Select.Option

@observer
class ProblemEdit extends React.Component {
  async componentWillMount() {
    await store.initialData()
    await store.fetchEditTask()
  }

  onSubmit = e => {
    e.preventDefault()
    store.updateTask()
  }

  render() {
    if (store.loading) {
      return <div />
    }

    return (
      <Card>
        <h2>แก้ไขโจทย์ {store.task.task_name}</h2>
        <form action="#" onSubmit={e => this.onSubmit(e)}>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">หัวข้อการเรียนรู้</label>
                <Select
                  value={store.task.topic}
                  style={{ width: '100%' }}
                  onChange={value => store.setTask('topic', value)}
                  disabled
                >
                  {store.topics.map(topic => (
                    <Option key={topic.pk} value={topic.pk}>
                      {topic.topic_name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">ระดับความยาก</label>
                <Select
                  value={store.task.level}
                  style={{ width: '100%' }}
                  onChange={value => store.setTask('level', value)}
                  disabled
                >
                  {store.levels.map(level => (
                    <Option key={level.pk} value={level.pk}>
                      {level.level_name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">หมวดหมู่</label>
                <Select
                  value={store.task.task_type}
                  style={{ width: '100%' }}
                  onChange={value => store.setTask('task_type', value)}
                  disabled
                >
                  <Option value={'PRACTICE'}>ฝึกฝน</Option>
                  <Option value={'CHALLENGE'}>รวมโจทย์</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">ชื่อโจทย์</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={e => store.setTask('task_name', e.target.value)}
                  value={store.task.task_name}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">รายละเอียดโจทย์</label>
                <textarea
                  className="form-control"
                  onChange={e => store.setTask('task_desc', e.target.value)}
                  value={store.task.task_desc}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">ข้อมูล Input</label>
                <textarea
                  className="form-control"
                  onChange={e => store.setTask('input_desc', e.target.value)}
                  value={store.task.input_desc}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">ข้อมูล Output</label>
                <textarea
                  className="form-control"
                  onChange={e => store.setTask('output_desc', e.target.value)}
                  value={store.task.output_desc}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">ข้อจำกัด</label>
                <textarea
                  className="form-control"
                  onChange={e => store.setTask('constrain_desc', e.target.value)}
                  value={store.task.constrain_desc}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">ตัวอย่าง</label>
                <textarea
                  className="form-control"
                  onChange={e => store.setTask('examples', e.target.value)}
                  value={store.task.examples}
                  required
                />
              </div>
            </div>
          </div>
          <hr />
          <h5>Testcases</h5>
          {store.testcases.map((testcase, index) => (
            <div className="row" key={index}>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="">Test {index + 1}</label>
                  <textarea
                    className="form-control"
                    onChange={e => store.setTestcase(index, 'test', e.target.value)}
                    value={testcase.test}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="">Expected Result</label>
                  <textarea
                    className="form-control"
                    onChange={e => store.setTestcase(index, 'expected_output', e.target.value)}
                    value={testcase.expected_output}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <hr />
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">ชุด Code ตั้งต้น</label>
                <textarea
                  className="form-control"
                  rows={7}
                  placeholder={`int plus(int a, int b) {\n\t/* code here */\n\treturn 9;\n}`}
                  onChange={e => store.setTask('default_code', e.target.value)}
                  value={store.task.default_code}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-success btn-block btn-lg">อัพเดทโจทย์</button>
            </div>
          </div>
        </form>
      </Card>
    )
  }
}

export default ProblemEdit
