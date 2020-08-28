import React, { Component } from 'react';

import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        track_list: [],
        heading: 'Top 10 Tracks'
    }

    componentDidMount() {
        axios
            .get(
                `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=46f9cc1588c5bef578864f3dbf55f52f`
            )
            .then(res => {
                // console.log(res.data) 
                this.setState({ track_list: res.data.message.body.track_list })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
