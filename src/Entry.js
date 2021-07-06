import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Markdown from 'markdown-to-jsx';
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0, 2),
  },
  container: {
    flexGrow: 1
  },
  contentTitle: {
    margin: theme.spacing(4, 0, 0)
  },
  contentContent: {
    margin: theme.spacing(2, 0, 10)
  }
}))

function Entry() {
  const classes = useStyles();
  
  let { reponame } = useParams();
  
  const [content, setContent] = useState({});
  
  const md_url = 'https://note.figmentresearch.com/articles/' + reponame + '.json'

  useEffect(() => {
    async function doGet() {
      try {
        fetch(md_url)
          .then(res => res.json())
          .then(result => {
            console.log(result)
            setContent(result)
          })
      } catch (err) {
        console.log('error doGet')
      }
    }
    doGet()
  }, [reponame, md_url])
  
  return (
    <React.Fragment> 
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          Markdown Rendering
        </Typography>
      </Container>
      <Container maxWidth="sm" className={classes.container}>
        <React.Fragment> 
          <Box className={classes.contentTitle}>
            <Typography variant="h5" align="left">
              {content.title}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="left" className={classes.contentContent}>
            { content && content.content && content.content.length > 0 &&
              <Markdown>
                {content.content}
              </Markdown>
            }
          </Box>
        </React.Fragment>
      </Container>
    </React.Fragment> 
  );
}

export default Entry
