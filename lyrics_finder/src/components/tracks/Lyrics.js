import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
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
                // console.log(res.data)
                this.setState({ lyrics: res.data.message.body.lyrics });

                return axios  // fetch lyrics body of selected music
                    .get(
                        `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=46f9cc1588c5bef578864f3dbf55f52f`
                    );
            })
            .then(res => {
                console.log(res.data);
                this.setState({ track: res.data.message.body.track })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { track, lyrics } = this.state;
        if (track === undefined || Object.keys(track).length === 0 ||
            lyrics === undefined || Object.keys(lyrics).length === 0) {
            return <Spinner />
        }
        else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                    <div className="card">
                        <h5 className="card-header">
                            {track.track_name} by{' '}
                            <span className="text-secondary">{track.artist_name}</span>
                        </h5>
                        <div className="card-body">
                            <p className="card-text">{lyrics.lyrics_body}</p>
                        </div>
                    </div>

                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Album ID</strong>: {track.album_id}
                        </li>
                        <li className="list-group-item">
                            <strong>Song Genre</strong>: {track.primary_genres.music_genre_list.length > 0 ?
                                track.primary_genres.music_genre_list[0].music_genre.music_genre_name : "Pop"}
                        </li>
                        <li className="list-group-item">
                            <strong>Explicit Words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
                        </li>
                        {/* <li className="list-group-item">
                            <strong>Release Date</strong>: {track.updated_time}
                        </li> */}
                    </ul>
                </React.Fragment>
            )
        }
    }
}

export default Lyrics;
