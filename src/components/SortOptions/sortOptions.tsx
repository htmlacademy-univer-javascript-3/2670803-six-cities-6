import { FC, useState } from 'react';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

interface SortOptionsProps {
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
}

const SortOptions: FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortTypes: SortType[] = [
    'Popular',
    'Price: low to high',
    'Price: high to low',
    'Top rated first'
  ];

  const handleSortClick = (sortType: SortType) => {
    onSortChange(sortType);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {sortTypes.map((sortType) => (
          <li
            key={sortType}
            className={`places__option ${currentSort === sortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortClick(sortType)}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortOptions;
