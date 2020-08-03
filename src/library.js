import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import { createSelector } from 'reselect';
import queryString from 'query-string';
import { registerEvent } from '../../libs/events';
import useStyles from './LibraryStyles';
import SidebarWrapper from '../../components/SidebarWrapper/SidebarWrapper';
import Spinner from '../../components/Spinner/Spinner';
import Container from '@material-ui/core/Container';
import ArticleModal from '../../components/ContentModals/ArticleModal/ArticleModal';
import VideoModal from '../../components/ContentModals/VideoModal/VideoModal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ContentCard from '../../components/ContentCard/ContentCard';
import InfiniteScroll from 'react-infinite-scroller';

// get the nudges in the library from the general list of nudges
const getCurrentNudges = createSelector(
  state => state.library.library,
  state => state.nudges.nudges,
  (library, nudges) => {
    let currentNudges = library.map(id => nudges[id]);
    return currentNudges;
  }
)

export default function Library(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const nudges = useSelector(state => getCurrentNudges(state));
  const library = useSelector(state => state.library.library);
  const [entry, setEntry] = useState({});
  const loading = useSelector(state => state.library.loading);
  const [value, setValue] = useState(0);
  const [typeAnchor, setTypeAnchor] = useState(null);
  const [sortAnchor, setSortAnchor] = useState(null);

  const [filter, setFilter] = useState("bookmarked");
  const [typeFilter, setTypeFilter] = useState("all");

  const [sortFilterTitle, setSortFilterTitle] = useState("Most recent");
  const [sortFilter, setSortFilter] = useState("date");

  const [textFilter, setTextFilter] = useState("");

  const [showArticleModal, setArticleModalShow] = useState(false);
  const [showVideoModal, setVideoModalShow] = useState(false);

  // PAGINATION PARAMETERS
  const perPage = 6;
  const scroller = useRef(null);
  const [items, setItems] = useState([]);

  // FETCH ON THE FIRST PAGE LOAD
  useEffect(() => {
    dispatch(actions.fetchLibrary("bookmarked", "sort=date", 0, perPage));
  }, [dispatch]);

  useEffect(() => {
    /** only run useEffect if there are new nudges to be added to the queue;
      * prevents concatination of the same nudge
      * on bookmarking / marking interesting etc.
      */
    if (nudges && nudges.length > 0) {
      setItems(prevState => prevState.some(i => nudges.some(l => l._id === i._id)) ? prevState : prevState.concat(nudges));
    }
  }, [nudges]);

  function stringifyFilters(sort, type, text) {
    return queryString.stringify({
      sort: sort,
      type: type,
      text: text
    });
  }

  // LOAD ON SCROLL
  function loadItems(page) {
    let stringifiedSort = stringifyFilters(sortFilter, typeFilter, textFilter);

    dispatch(actions.fetchLibrary(filter, stringifiedSort, page, perPage));
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    // refresh infinite scroll when changing tab
    scroller.current.pageLoaded = 0;
  };

  // LOAD ON TAB CHANGE
  const fetchEntries = (filterType) => {
    setFilter(filterType);
    setItems([]);
    dispatch(actions.fetchLibrary(filterType, "sort=date", 0, perPage));
  }

  // =========================
  // FILTERS LOGIC
  const handleTypeClick = event => {
    setTypeAnchor(event.currentTarget);
  };

  const handleTypeChoice = (value) => {
    setTypeAnchor(null);
    if (value !== undefined) {
      setTypeFilter(value);

      setItems([]);

      let stringifiedSort = stringifyFilters(sortFilter, value, textFilter);

      dispatch(actions.fetchLibrary(filter, stringifiedSort, 0, perPage));
    }
  };

  const handleSortClick = event => {
    setSortAnchor(event.currentTarget);
  };

  const handleSortChoice = (value, lable) => {
    setSortAnchor(null);
    if (value !== undefined) {
      setSortFilter(value);
      setSortFilterTitle(lable);

      setItems([]);

      let stringifiedSort = stringifyFilters(value, typeFilter, textFilter);

      dispatch(actions.fetchLibrary(filter, stringifiedSort, 0, perPage));
    }
  };

  const handleSearch = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      let stringifiedSort = stringifyFilters(sortFilter, typeFilter, textFilter);
      setItems([]);
      dispatch(actions.fetchLibrary(filter, stringifiedSort));
    }
  }
  // =========================

  function showContent(entry) {
    setEntry(entry);

    registerEvent("nudge.opened", entry._id, dispatch);

    if (entry.contentType === "article") {
      setArticleModalShow(true);
    } else if (entry.contentType === "video") {
      setVideoModalShow(true);
    }
  }

  return (
      <SidebarWrapper pageHeader="Library">
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3" component="h1" className={classes.header} gutterBottom>
                Library
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Paper className={classes.tabsContainer}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab className={classes.libTab} onClick={() => fetchEntries("bookmarked")} label="Bookmarked" />
                  <Tab className={classes.libTab} onClick={() => fetchEntries("interesting")} label="Interesting" />
                  <Tab className={classes.libTab} onClick={() => fetchEntries("viewed")} label="Viewed" />
                </Tabs>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={3} className={classes.filterMenu}>
                <div className={classes.searchBar}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      /*root: classes.inputRoot,*/
                      input: classes.inputClass,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={textFilter}
                    onChange={(e) => setTextFilter(e.target.value)}
                    onKeyPress={(e) => handleSearch(e)}
                  />
              </div>
              </Grid>
              <Grid item xs={12} lg={3} className={classes.filterMenu}>
              <div>
                <p className={classes.filterType}>Type:</p>
                <Button aria-controls="type-menu" className={classes.filterButton} aria-haspopup="true" color="primary" onClick={handleTypeClick}>
                  {typeFilter} <KeyboardArrowDownIcon />
                </Button>
                <Menu
                className={classes.list}
                  id="type-menu"
                  anchorEl={typeAnchor}
                  keepMounted
                  open={Boolean(typeAnchor)}
                  onClose={() => handleTypeChoice(undefined)}
                >
                  <MenuItem onClick={() => handleTypeChoice("all")}>All</MenuItem>
                  <MenuItem onClick={() => handleTypeChoice("article")}>Article</MenuItem>
                  <MenuItem onClick={() => handleTypeChoice("video")}>Video</MenuItem>
                </Menu>
              </div>

              <div>
                <p className={classes.filterType}>Sort by:</p>
                <Button className={classes.filterButton} aria-controls="sort-menu" aria-haspopup="true" color="primary" onClick={handleSortClick}>
                  {sortFilterTitle} <KeyboardArrowDownIcon />
                </Button>
                <Menu
                  className={classes.list}
                  id="sort-menu"
                  anchorEl={sortAnchor}
                  keepMounted
                  open={Boolean(sortAnchor)}
                  onClose={() => handleSortChoice(undefined)}
                >
                  <MenuItem onClick={() => handleSortChoice("date", "Most recent")}>Most recent</MenuItem>
                  <MenuItem onClick={() => handleSortChoice("interesting", "Interesting")}>Interesting</MenuItem>
                  <MenuItem onClick={() => handleSortChoice("longer", "From long to short")}>From long to short</MenuItem>
                  <MenuItem onClick={() => handleSortChoice("shorter", "From short to long")}>From short to long</MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>

          <InfiniteScroll
              ref={scroller}
              pageStart={1}
              initialLoad={false}
              loadMore={loadItems}
              hasMore={library && library.length === perPage}
              loader={<div className="loader" key="loader">Loading ...</div>}
          >
          <Grid container spacing={3} className={classes.itemsContainer}>
            { items.length > 0 ?
              items.map(entry =>
              <Grid item xs={12} md={6} lg={4} key={entry._id} className={classes.contentContainer}>
                <ContentCard
                  content={entry}
                  clicked={() => showContent(entry)}
                  registerEvents={true}
                />
              </Grid>
            ) :
            ( loading ?
              <Grid container justify="center"><Spinner /></Grid>
            : <Grid item xs={12} className={classes.NA_container}>
              <Typography variant="h4" component="h2" className={classes.NA_subHeader} gutterBottom>
                Nothing here yet!
              </Typography>
              <img alt="A creature with boxes of content" src="/img/svg/asset-19.svg" className={classes.NA_img} />
            </Grid>
          )}
          </Grid>
          </InfiniteScroll>

          {/** Only render modals if they have to be shown
            * otherwise Interesting switch is not consistent:
            * since it is defined as state, it is moving from entry to entry
            * if users click a card after another
            */}
          { showArticleModal ?
            <ArticleModal
              registerEvents={true}
              show={showArticleModal}
              entry={entry}
              onHide={() => setArticleModalShow(false)}
            /> : null
          }

          { showVideoModal ?
            <VideoModal
              registerEvents={true}
              show={showVideoModal}
              entry={entry}
              onHide={() => setVideoModalShow(false)}
            /> : null
          }
          </Container>
      </SidebarWrapper>
  );
}