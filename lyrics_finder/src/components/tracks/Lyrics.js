import React, { Component } from 'react';

import axios from 'axios';

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {},
    }

    componentDidMount() {
        axios  // first fetch lyrics body of selected music
            .get(
                `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=46f9cc1588c5bef578864f3dbf55f52f`
            )
            .then(res => {
                console.log(res.data)
                this.setState({ lyrics: res.data.message.body.lyrics });

                return axios  // fetch lyrics body of selected music
                    .get(
                        `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?commontrack_id=5920049=${this.props.match.params.id}&apikey=46f9cc1588c5bef578864f3dbf55f52f`
                    );
            })
            .then(res => {
                console.log(res.data);
                this.setState({ track: res.data.message.body.track })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                Lyrics
            </div>
        )
    }
}

export default Lyrics;
