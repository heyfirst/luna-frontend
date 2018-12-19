import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Core/Layout'
import Card from '../components/Core/Card'
import Avatar from '../components/Core/Avatar'
import RankingService from '../services/RankingSevice'
import { Link } from 'react-static'

const Table = styled.table`
  .rank {
    width: 10%;
  }

  td {
    vertical-align: middle;
  }
`
class Ranking extends React.Component {
  state = {
    ranks: []
  }
  async componentWillMount() {
    await RankingService.getRanking().then(resp => {
      this.setState({
        ranks: resp.data
      })
    })
  }
  render() {
    return (
      <Layout>
        <div className="container position-relative pt-4">
          <Card>
            <div className="text-center px-4">
              <h3>Ranking จัดอันดับ</h3>
              <Table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="rank">
                      อันดับ
                    </th>
                    <th scope="col" className="text-left">
                      ชื่อผู้ใช้
                    </th>
                    <th scope="col">คะแนน</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ranks.map((rank, index) => (
                    <tr key={index + 1}>
                      <td scope="row">{index + 1}</td>
                      <td className="">
                        <Link to={`/profile/${rank[0].username}`}>
                          <div className="d-flex align-items-center justify-content-start">
                            <Avatar
                              size={'38'}
                              src={rank[0].avatar}
                              className="d-inline-block mx-1"
                            />
                            {`${rank[0].first_name || '-'} ${rank[0].last_name || ''}`}
                          </div>
                        </Link>
                      </td>
                      <td>{rank[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </div>
      </Layout>
    )
  }
}

export default Ranking
