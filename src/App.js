import React, {useState} from 'react';
import './index.scss';
import {Collection} from './Collection';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [collections, setCollections] = useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://631054e736e6a2a04eeb4119.mockapi.io/photo_collections?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollection(json);
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении данных')
      }). finally(() => setIsLoading(false));
  }, [categoryId, page]);
  

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
              <li 
              onClick={() => setCaregoryId(i)} 
              className={categoryId === i ? 'active' : ''} 
              key={obj.name}>
              {obj.name}
              </li>
            ))}
        </ul>
        <input 
          value={searchValue} 
          onChange={e => setSearchValue(e.target.value)} 
          className="search-input" 
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => (<Collection key={index} name={obj.name} images={obj.photos} />
        ))
        )}
      </div> 
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} 
          className={page === (i + 1) ? 'active' : ''}>
          {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

