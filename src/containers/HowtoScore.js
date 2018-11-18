import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Core/Layout'
import Card from '../components/Core/Card'

const Table = styled.table`
  .beginner {
    color: #47d1a8;
    font-weight: bold;
  }

  .intermediate {
    color: #00cce8;
    font-weight: bold;
  }

  .advance {
    color: #ff4593;
    font-weight: bold;
  }
`

const HowtoScore = () => (
  <Layout>
    <div className="container position-relative pt-4">
      <Card>
        <h3 className="text-center">คะแนนที่จะได้รับเมื่อแก้โจทย์ปัญหาผ่าน</h3>
        <div className="px-2">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <Table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">โจทย์รวม</th>
                    <th scope="col">คะแนน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">ระดับง่าย</td>
                    <td className="beginner">10</td>
                  </tr>
                  <tr>
                    <td scope="row">ระดับปานกลาง</td>
                    <td className="intermediate">50</td>
                  </tr>
                  <tr>
                    <td scope="row">ระดับยาก</td>
                    <td className="advance">100</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="px-2">
          <h5>การจัดอันดับ (Ranking)</h5>
          <p>ระบบจะทำการจัดอันดับใหม่แบบ Realtime โดยคะแนนรวมจะมาจากการทำโจทย์ฝึกฝนและโจทย์รวม</p>
        </div>
      </Card>
    </div>
  </Layout>
)

export default HowtoScore
