import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { api } from '../../api';
import { notificationType } from '../../components/notification-item/component';
import loadingNames from '../../constants/loading-names';
import { withFoundWord } from '../foundWord';
import { withLoadingNames } from '../loading-names';
import { withNotifications } from '../notifications';

const WordsContext = createContext({});

const wordsInitialState = {
  words: [],
  gif: '',
};

class WordsProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    showNotification: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    setFoundWord: PropTypes.func.isRequired,
  };

  state = wordsInitialState;

  cleanWords = () =>
    this.setState(prevState => ({
      ...prevState,
      words: wordsInitialState.words,
    }));

  handleGetGif = params => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.getGifs))
      .then(() => api.getGifs(params))
      .then(gifs => {
        const downsizedGifs = gifs.data && gifs.data.map(gif => gif.images.downsized_large.url);
        const randomGif = downsizedGifs && downsizedGifs[Math.round(Math.random()*downsizedGifs.length)];

        return this.setState({
          gif: randomGif
        });
      })
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.getGifs))
  };

  handleFetchWords = () => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.wordsList))
      .then(() => api.getWordsList())
      .then(words => this.setState({ words }))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.wordsList))
  };

  handleFetchWordsToLearn = () => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.learnWord))
      .then(() => api.getWordsListToLearn())
      .then(words => this.setState({ words }))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.learnWord))
  };

  handleCreateWord = data => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.saveWord))
      .then(() => api.createWord(data))
      .then(() => showNotification('The word has been saved successfully', notificationType.success))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.saveWord))
  };

  handleDeleteWord = id => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.deleteWord))
      .then(() => api.deleteWord(id))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.deleteWord))
      .then(() => this.handleFetchWords());
  };

  handleLearnWord = wordId => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.learnWord))
      .then(() => api.learnWord(wordId))
      .then(() =>
        this.setState(prevState => ({
            words: [...prevState.words.filter(word => word._id !== wordId)]
          })))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.learnWord))

  };

  handleRelearnWord = wordId => {
    this.setState(prevState => {
      const wordToRelearn = prevState.words.find(word => word._id === wordId);

      return ({
        words: [
          ...prevState.words.filter(word => word._id !== wordToRelearn._id),
          wordToRelearn,
        ]
      });
    })
  };

  handleSearchWord = params => {
    const { showNotification, startLoading, stopLoading, setFoundWord } = this.props;

    return Promise.resolve(startLoading(loadingNames.searchWord))
      .then(() => Promise.all([
          api.searchWord(params),
          this.handleGetGif({ q: params.text })
        ]))
      .then(([foundWord]) => setFoundWord(foundWord))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.searchWord))
  };

  render() {
    const { words, gif } = this.state;
    const { children } = this.props;

    return (
      <WordsContext.Provider
        value={{
          words,
          gif,
          fetchWords: this.handleFetchWords,
          fetchWordsToLearn: this.handleFetchWordsToLearn,
          saveWord: this.handleCreateWord,
          searchWord: this.handleSearchWord,
          learnWord: this.handleLearnWord,
          relearnWord: this.handleRelearnWord,
          deleteWord: this.handleDeleteWord,
          cleanWords: this.cleanWords,
        }}
      >{children}</WordsContext.Provider>
    );
  }
}

const WordsProvider = compose(
  withFoundWord,
  withLoadingNames,
  withNotifications,
)(WordsProviderCmp);

const withWords = Cmp => props =>
  <WordsContext.Consumer>{value => <Cmp {...value} {...props} />}</WordsContext.Consumer>;

export { WordsProvider, withWords, wordsInitialState };
