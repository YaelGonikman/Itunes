import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NewWindow from 'react-new-window'
import { Player } from 'video-react';
import "video-react/dist/video-react.css";

const cardStyle = {
    padding: 20,
    display: 'flex',
    height: 120,
    width: 500,
    marginTop: 10,
    textAlign: 'center',
    opacity:0.8
}
const divStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 700,
    textAlign: 'center'
}

function ItunesItem(props) {
    const [openNewWindow, setopenNewWindow] = useState(false);
    const [play, setplay] = useState(false);
    const [audio, setaudio] = useState("");

    useEffect(() => {
        setaudio(new Audio(props.previewUrl))
    }, [])

    const togglePlay = () => {
        setplay(!play )
        play ? audio.play() : audio.pause();

    }

    const getInfo = () => {
        setopenNewWindow(!openNewWindow)
    }

    const secondsToTime = (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return mins + ':' + secs;
    }

    return (
        <>
            {
                openNewWindow ?
                    <NewWindow onUnload={getInfo} title={props.name} >
                        <Card style={{ display: 'flex', margin: 20, textAlign: 'center' }}>
                            {props.kind != "music-video" ?
                                <CardMedia
                                    style={{ width: 300, height: 200, marginTop: 10 }}
                                    image={props.image}
                                    title={props.name}
                                />
                                :
                                <Player
                                    playsInline
                                    poster="/assets/poster.png"
                                    src={props.previewUrl}
                                />
                            }
                            <div style={{ display: 'flex', flexDirection: 'column', width: 700, textAlign: 'center' }}>
                                <CardContent style={{ flex: '1 0 auto', textAlign: 'center' }}>
                                    <Typography component="h6" variant="h6">
                                        {props.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {props.author}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {props.collectionCensoredName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {props.genreName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {"Time:" + secondsToTime(parseInt(props.trackTimeMillis))}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {"Release Date:" + props.releaseDate.replace("T", " ").replace("Z", " ")}
                                    </Typography>
                                </CardContent>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: 20,
                                    paddingBottom: 10,
                                    textAlign: 'center',
                                    marginLeft: '32%'
                                }}>
                                    {
                                        props.kind != "music-video" ?
                                            <IconButton aria-label="play/pause">
                                                <PlayArrowIcon style={{ height: 38, width: 38, }} onClick={togglePlay} />
                                            </IconButton>
                                            : null
                                    }
                                </div>
                            </div>

                        </Card>
                    </NewWindow>
                    : null
            }
            <Card style={cardStyle} onClick={getInfo}>
                <div style={divStyle}>
                    <CardContent style={{ flex: '1 0 auto', textAlign: 'center' }}>
                        <Typography component="h6" variant="h6">
                            {props.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {props.author}
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    style={{ width: 150, height: 100, marginTop: 10 }}
                    image={props.image}
                    title={props.name}
                />
            </Card>
        </>
    )
}

export default ItunesItem 

