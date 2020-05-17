
import React, {  useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import ItunesItem from "../../Components/ItunesItem/ItunesItem";
import { findBestResults, addToTopSearches, getFavorite } from '../../actions/Search';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Dialog } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import { MDBCol, MDBInput } from "mdbreact";

function Itunes(props){
    const [isOpen, setisOpen] = useState(false);
    const [currentInput, setcurrentInput] = useState("");

    const handleSearch = () => {
        props.addToTopSearches(currentInput, props.auth.user);
    }
    const handleInputChange= (e)=> {
        props.findBestResults(e.target.value);
        setcurrentInput(e.target.value);
    }
    const getFavorite= ()=> {
        props.getFavorite(props.auth.user);
        setisOpen(true);

    }
        return (
            <>
                <div className="container" style={{ marginTop: 50, marginLeft: '35%', width: 800 }}>
                    <MDBCol md="5" style={{ display: 'flex' }}>
                        {props.auth.user.email != undefined ?
                            <IconButton style={{ marginBottom: 10 }} >
                                <FavoriteIcon style={{ width: 40, height: 40 }} onClick={getFavorite} />
                            </IconButton>
                            : null
                        }
                        <MDBInput style={{ width: 300, margin: 20 }} hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3"
                            value={currentInput} onChange={handleInputChange} />
                        <IconButton style={{ marginBottom: 10 }}>
                            <SearchIcon style={{ width: 40, height: 40 }} onClick={handleSearch} />
                        </IconButton>
                    </MDBCol>
                </div>
                <div style={{ display: 'inherit', marginLeft: '35%' }}>
                    {props.search.searches.map((res, i) => {
                        return (<ItunesItem key={i}
                            name={res.trackName}
                            author={res.artistName}
                            genreName={res.primaryGenreName}
                            trackTimeMillis={res.trackTimeMillis}
                            releaseDate={res.releaseDate}
                            previewUrl={res.previewUrl}
                            collectionCensoredName={res.collectionCensoredName}
                            image={res.artworkUrl100}
                            kind={res.kind}
                        ></ItunesItem>)
                    })}
                </div>

                <Dialog
                    disableEscapeKeyDown
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                    open={isOpen}
                    onClose={() =>setisOpen(false)}>
                    <DialogTitle id="confirmation-dialog-title">YOUR TOP 10 SEARCHES</DialogTitle>
                    <DialogContent >
                        {
                            props.search.topTen.map((res, i) => {
                                return (<ListItem>
                                    <ListItemText
                                        primary={res}
                                    />
                                </ListItem>)
                            })
                        }
                    </DialogContent>

                </Dialog>
            </>
        )
    }


Itunes.propTypes = {
    addToTopSearches: PropTypes.func.isRequired,
    findBestResults: PropTypes.func.isRequired,
    getFavorite: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    search: state.search,
    auth: state.auth,
    errors: state.errors,
    findBestResults: state.findBestResults,
    addToTopSearches: state.addToTopSearches,
    getFavorite: state.getFavorite
})

export default connect(mapStateToProps, { findBestResults, addToTopSearches, getFavorite })(Itunes)