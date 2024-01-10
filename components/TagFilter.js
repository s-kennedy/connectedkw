import { useState, useEffect, useRef, forwardRef } from 'react'
import styles from 'styles/ideaGenerator.module.css'
import { tagEmojiDict, eventCategories } from 'utils/constants'
import ReactModal from 'react-modal';
import {
  useHover,
  useFocus,
  useClick,
  useDismiss,
  useInteractions,
  useListNavigation,
  useFloating,
  FloatingArrow, 
  arrow,
  offset,
  shift
} from '@floating-ui/react';


const OptionButton = forwardRef(function OptionButton(props, ref) {
  const { filter, option, toggleFn, isSelected } = props;
  
  const handleClick = () => {
    toggleFn(filter, option.id)
  }

  return (
    <button ref={ref} onClick={handleClick} className={`block text-sm px-2 py-1 m-1 ml-0 flex items-center`}>
      <span className={`h-3 w-3 inline-block rounded-full border-2 mr-1 ${isSelected ? 'bg-green' : 'bg-white'}`} />
      <span className="whitespace-nowrap">{option.name}</span>
    </button>
  )
})

const TagFilter = ({ filter, toggleFn, selectedOptions }) => {

  // const {refs, floatingStyles} = useFloating();

  const [activeFilterId, setActiveFilterId] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleFlagClick = (filter) => () => {
    toggleFn(filter)
  }

  const listRef = useRef([]);
  const arrowRef = useRef(null);

  const { context, refs, floatingStyles } = useFloating({
    placement: 'right-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset({
        mainAxis: -17,
        crossAxis: -2
      }),
      shift()
    ],
  });

  const focus = useFocus(context);
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex
  });

 
  const {getReferenceProps, getFloatingProps, getItemProps} = useInteractions([
    focus,
    click,
    dismiss,
    listNav,
  ]);

  if (filter.type === "boolean") {
    return (
      <button key={filter.id} onClick={handleFlagClick(filter)} className={`btn ${(selectedOptions) ? 'btn-purple' : 'btn-white'} border-2 whitespace-nowrap relative block`}>
        {/*{(selectedOptions) && <span className="h-2 w-2 rounded-full bg-red inline-block absolute -left-1" /> }*/}
        <span>{filter.label}</span>
      </button>
    )
  }

  return (
    <>
      <button 
        key={filter.id} 
        type="button" 
        ref={refs.setReference} 
        className={`btn ${(selectedOptions.length > 0) ? 'btn-purple' : 'btn-white'} whitespace-nowrap relative block`}
        {...getReferenceProps()} 
      >
        {/*{(selectedOptions.length > 0) && <span className="h-2 w-2 rounded-full bg-red inline-block absolute -left-1" /> }*/}
        <span>{filter.label}</span>
        <i className={`ml-1 fa-solid ${isOpen ? 'fa-caret-left text-black' : 'fa-filter text-sm'}`}></i>
      </button>
      { isOpen &&
      <div 
        ref={refs.setFloating} 
        style={floatingStyles} 
        className="z-20" 
        {...getFloatingProps()} 
      >
        {/*<FloatingArrow ref={arrowRef} context={context} />*/}
        <div className={`${styles.appear} border-2 rounded-md bg-white max-h-60 overflow-auto`}>
          {filter.options.map((option, index) => {
            const isSelected = selectedOptions.includes(option.id)
            return (
              <OptionButton 
                key={option.id} 
                filter={filter} 
                option={option} 
                isSelected={isSelected} 
                toggleFn={toggleFn} 
                ref={(node) => {
                  listRef.current[index] = node;
                }}
                {...getItemProps()}
              />
            )
          })}
        </div>
      </div>
      }
    </>
  )
}

export default TagFilter
