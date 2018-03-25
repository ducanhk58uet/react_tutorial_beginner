import React, {Component} from 'react';
import {Layout, Input, Button, Row, Col, Icon} from 'antd';

const { Header } = Layout;

class ViewHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

    }

    onChange = (event) => this.setState({ value: event.target.value });

    refreshInputValue = () => {
        this.setState({value: ''});
    }

    render() {

        const {onClickListener} = this.props;

        return (
            <Header >
                <Row>
                    <Col md={22}>
                        <Input value={this.state.value} onChange={this.onChange} />
                    </Col>
                    <Col md={2} align="middle">
                        <Button type="primary" onClick={() => {onClickListener(this.state.value); this.refreshInputValue();}}><Icon type="plus" /> Thêm mới</Button>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default ViewHeader;
