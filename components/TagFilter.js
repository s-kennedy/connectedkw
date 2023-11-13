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
        mainAxis: -12,
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
      <button key={filter.id} onClick={handleFlagClick(filter)} className="btn btn-clear whitespace-nowrap relative block pl-1">
        {(selectedOptions) && <span className="h-2 w-2 rounded-full bg-red inline-block absolute -left-1" /> }
        <div className="flex items-center">
          <span>{filter.label}</span>
          <i className="fa-solid fa-star text-xs ml-1"></i>
        </div>
      </button>
    )
  }

  return (
    <>
      <button 
        key={filter.id} 
        type="button" 
        ref={refs.setReference} 
        className="btn btn-clear whitespace-nowrap relative block pl-1"
        {...getReferenceProps()} 
      >
        {(selectedOptions.length > 0) && <span className="h-2 w-2 rounded-full bg-red inline-block absolute -left-1" /> }
        <span>{filter.label}</span>
        <i className={`ml-1 fa-solid ${isOpen ? 'fa-caret-left' : 'fa-caret-right text-sm'}`}></i>
      </button>
      { isOpen &&
      <div 
        ref={refs.setFloating} 
        style={floatingStyles} 
        className="z-20" 
        {...getFloatingProps()} 
      >
        {/*<FloatingArrow ref={arrowRef} context={context} />*/}
        <div className={`${styles.appear} border-2 rounded-md bg-white`}>
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
