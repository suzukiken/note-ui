import { graphqlOperation, API } from 'aws-amplify';
import { searchArticles, searchPrograms } from './graphql/queries';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0),
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 700,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  contentTitle: {
    margin: theme.spacing(3, 0, 1),
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing(5, 0),
  },
  contentContent: {
    margin: theme.spacing(2, 0, 0),
  },
  codeTitle: {
    fontSize: 16
  },
  slider: {
    width: 150
  },
  divider: {
    height: 28,
    margin: theme.spacing(0, 0.5, 0, 0),
  },
  selector: {
    padding: theme.spacing(0, 1)
  }
}))

function HighlightedCode(props) {
  const classes = useStyles();
  
  let contents = ''
  
  if (props.highlight.code) {
    for (let i in props.highlight.code) {
      contents += props.highlight.code[i]
    }
  }
  return (
    <pre className={classes.contentContent} dangerouslySetInnerHTML={{__html: contents}} />
  )
}

function HighlightedContent(props) {
  const classes = useStyles();
  
  let contents = ''
  
  if (props.highlight.content) {
    for (let i in props.highlight.content) {
      contents += '.....' + props.highlight.content[i] + '.....'
    }
  }
  return (
    <Box className={classes.contentContent} dangerouslySetInnerHTML={{__html: contents}} />  
  )
}

function Programs(props) {
  const classes = useStyles();
  const programList = props.programs.map((row, index) =>
    <React.Fragment key={index}> 
      <Box className={classes.contentTitle}>
        <Typography align="left" className={classes.codeTitle}>
          <Link href={`${row.id}`}>
          {row.id.replace('https://github.com/suzukiken/', '')}
          </Link>
        </Typography>
      </Box>
      <HighlightedCode highlight={row.highlight} />
    </React.Fragment>
  )
  return (
    <div>{programList}</div>
  )
}

function Articles(props) {
  const classes = useStyles();
  const articleList = props.articles.map((row, index) =>
    <React.Fragment key={index}> 
      <Box className={classes.contentTitle}>
        <Typography variant="h6" align="left">
          <Link href={`/article/${row.reponame}/`}>
          {row.title}
          </Link>
        </Typography>
      </Box>
      <HighlightedContent highlight={row.highlight} />
    </React.Fragment> 
  )
  return (
    <div>{articleList}</div>
  )
}

function Search() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("")
  const [articles, setArticles] = useState([])
  const [programs, setPrograms] = useState([])
  const [checked, setChecked] = useState(true)
  
  async function doSearch() {
    setLoading(true)
    if (checked) {
      try {
        const response = await API.graphql(graphqlOperation(searchPrograms, {
          word: inputText
        }));
        setLoading(false)
        console.log(response)
        setPrograms(response.data.searchPrograms)
      } catch (err) { console.log('error searchPrograms') }
    } else {
      try {
        const response = await API.graphql(graphqlOperation(searchArticles, {
          input: {
            word: inputText,
            fuzziness: Math.ceil(inputText.length / 6 - 1)
          }
        }));
        setLoading(false)
        console.log(response)
        setArticles(response.data.searchArticles)
      } catch (err) { console.log('error searchArticles') }
    }
  }
  
  function handleInputChange(event) {
    setInputText(event.target.value)
  }
  
  function handleCheckChange(event) {
    console.log(event)
    setChecked(!checked)
  }

  return (
    <div>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          Search
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
          Search by AWS Elasticsearch Service 2.3 t2.micro instance
        </Typography>
      </Container>
      <Box display="flex" justifyContent="center">
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleInputChange}
            value={inputText}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                console.log(e.target.value);
                doSearch()
              }
            }}
          />
          <IconButton className={classes.iconButton} aria-label="search" onClick={doSearch}>
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" mr={2} />
          <Box className={classes.selector}>
            <Grid component="label" container alignItems="center" spacing={0}>
              <Grid item>記事</Grid>
              <Grid item>
                <Switch
                  checked={checked}
                  onChange={handleCheckChange}
                />
              </Grid>
              <Grid item>コード</Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <Container maxWidth="sm" className={classes.contentContainer}>
        { loading ? <LinearProgress /> : '' }
        { checked ? <Programs programs={programs} /> : <Articles articles={articles} /> }
      </Container>
    </div>
  )
}

export default Search

