import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import { Typography } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import './styles.css';
import logo from './images/NewStory.png';
const alanKey = '6902bbe6b8ebdceb6acf2b944c8ca7352e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

  const [activeArticle, setActiveArticle] = useState(-1);
  const [newsArticles, setNewsArticles] = useState([]);
  const year = new Date().getFullYear();
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, savedArticles, number }) => {
        if (command === 'newHeadlines') {
          //console.log(savedArticles);
          setNewsArticles(savedArticles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = savedArticles[parsedNumber - 1];
          console.log(parsedNumber);
          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else{
            window.open(savedArticles[parsedNumber - 1].url, '_blank');
            alanBtn().playText('Opening...');
          }
        }
      }
    })
  }, [])

  return (
    <div >
      <div className='logoContaineree'>
        <img src={logo} className='alanLogoee' alt="logo" />
      </div>
      <div>
        <NewsCards className='news' articles={newsArticles} activeArticle={activeArticle} />
      </div>
      <div className='footer1'>
      <Typography variant="body1" component="h2">
          Created with
        </Typography>
        <FavoriteIcon/>
        <Typography variant="body1" component="h2">
          by Anshu
        </Typography>
      </div>
      <div className='footer'>
        Copyright <CopyrightIcon /> {year}
      </div>
    </div>
  );
};

export default App;