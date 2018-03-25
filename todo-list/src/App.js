import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import ViewHeader from './ViewHeader';
import ViewContent from "./ViewContent";



class App extends Component {

    addNewTodo = (title) => {
        this.viewContent.bindNewTotoItem(title);
    };

    render() {
        return (
            <Layout>
              <ViewHeader onClickListener={(title) => this.addNewTodo(title)}/>
              <ViewContent ref={viewContent  => {this.viewContent = viewContent}}>Content</ViewContent>
            </Layout>
        );
    }
}

export default App;
