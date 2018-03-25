import React, {Component} from 'react';
import {Layout, List, Card, Spin, Button, Switch, Icon} from 'antd';
const { Content } = Layout;

const dataSource = [
    {
        id: 1,
        title: 'Jobs 1',
        done: false,
        createdTime: new Date()
    }, {
        id: 2,
        title: 'Jobs 2',
        done: false,
        createdTime: new Date()
    },{
        id: 3,
        title: 'Jobs 3',
        done: false,
        createdTime: new Date()
    }
]

const options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
}

let id = 4;

export default class ViewContent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            data: [],
        }
        this.bindNewTotoItem = this.bindNewTotoItem.bind(this);
    }

    componentDidMount() {
        setTimeout(() =>
            this.getData((res) => {
                this.setState({
                    loading: false,
                    data: res,
                });
            }
        ), 3000);
    }

    bindNewTotoItem = (title) => {
        const res = {
            id: id,
            title: title,
            done: false,
            createdTime: new Date()
        }
        id = id + 1;
        this.addNewTodoData(res);
    }

    addNewTodoData = (res) => {
        const data = this.state.data.concat(res);
        this.setState({
            data,
            loadingMore: false,
        }, () => {
            window.dispatchEvent(new Event('resize'));
        });
    }

    onLoadMore = () => {
        this.setState({
            loadingMore: true
        });

        setTimeout(() => {
            const newList = [];
            for (var i = id; i <= id + 3; i++) {
                let res = {
                    id: i,
                    title: 'Jobs ' + i,
                    done: false,
                    createdTime: new Date()
                }
                newList.push(res);
            }
            id = id + 4;
            this.addNewTodoData(newList)
        }, 2000)
    }


    // fake request to get data
    getData = (callback) => {
        callback(dataSource);
    }

    switchOnChange = (check, id) => {
        this.state.data.map(item => {
            if (item.id === id) {
                console.log(item);
                if (check) {
                    item.done = true;
                } else {
                    item.done = false;
                }
            }
        })
        this.forceUpdate();
    }

    render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore}>Tải thêm</Button>}
            </div>
        ) : null;

        return (
            <Content style={{padding: '20px'}}>
                <Card title="Danh sách công việc">
                    <List itemLayout="horizontal" loading={loading} loadMore={loadMore} dataSource={data}
                        renderItem={item => (
                            <List.Item actions={[<a>Sửa</a>, <a>Xóa</a>]}>
                                <List.Item.Meta title={(item.done) ? (<del>[{item.id}] {item.title}</del>) : (<span>[{item.id}] {item.title}</span>)}
                                                description={item.createdTime.toLocaleTimeString("en-us", options)} />
                                <div>
                                    <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={false} onChange={(check) => this.switchOnChange(check, item.id)}/>
                                </div>
                            </List.Item>
                        )}>
                    </List>
                </Card>
            </Content>
        )
    }
}


