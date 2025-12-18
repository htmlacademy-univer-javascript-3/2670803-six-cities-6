import { FC, useState, useCallback } from 'react';
import { SortType } from '../types/types';
import { SortOptionsProps } from '../types/types';

const SORT_TYPES: SortType[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

const SortOptions: FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = useCallback((sortType: SortType) => {
    onSortChange(sortType);
    setIsOpen(false);
  }, [onSortChange]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_TYPES.map((sortType) => (
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
