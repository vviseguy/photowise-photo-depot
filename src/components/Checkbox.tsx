import React from 'react';
import './Checkbox.css';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onChange }) => {
  const [isChecked, setIsChecked] = React.useState<boolean>(checked);

  // Sync internal state when `checked` prop changes
  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent parent containers from also receiving this click
    e.stopPropagation();

    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange?.(newCheckedState);
  };

  return (
      <div className={`checkbox-box ${isChecked ? 'checkbox-checked' : ''}` } onClick={handleClick}>
        {isChecked && <i className="fa fa-check checkbox-icon" />}
      </div>
  );
};

export default Checkbox;
