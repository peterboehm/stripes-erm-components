import React from 'react';
import PropTypes from 'prop-types';
import ReactDropzone from 'react-dropzone';
import { isFunction, pickBy } from 'lodash';

import {
  Button,
  Icon,
} from '@folio/stripes/components';

import css from './FileUploader.css';

const FileUploader = props => {
  const {
    accept,
    acceptClassName,
    activeClassName,
    children,
    className,
    disabledClassName,
    errorMessage,
    footer,
    isDropZoneActive,
    maxSize,
    onDragEnter,
    onDragLeave,
    onDrop,
    rejectClassName,
    style,
    title,
    uploadButtonText,
    ...rest
  } = props;

  const dataTest = pickBy(rest, (_, key) => key.startsWith('data-test-'));

  return (
    <ReactDropzone
      accept={accept}
      acceptClassName={acceptClassName}
      activeClassName={activeClassName}
      disableClick
      disabledClassName={disabledClassName}
      maxSize={maxSize}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      rejectClassName={rejectClassName}
      style={style}
    >
      {({ getInputProps, getRootProps, open }) => (
        <div
          className={`${css.upload} ${className}`}
          data-test-drop-zone
          {...dataTest}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {errorMessage && (
            <span
              className={css.errorMessage}
              hidden={isDropZoneActive}
            >
              <Icon icon="exclamation-circle">
                <span data-test-error-msg>{errorMessage}</span>
              </Icon>
            </span>
          )}
          <span
            className={`${css.uploadTitle} ${isDropZoneActive ? css.activeUploadTitle : ''}`}
            data-test-title
          >
            {title}
          </span>
          <Button
            buttonStyle="primary"
            data-test-button
            hidden={isDropZoneActive}
          >
            {uploadButtonText}
          </Button>
          <div
            className={css.children}
            data-test-children
            hidden={isDropZoneActive}
          >
            {isFunction(children) ? children(open) : children}
          </div>
          {footer &&
            <div
              className={css.footer}
              data-test-footer
              hidden={isDropZoneActive}
            >
              {footer}
            </div>
          }
        </div>
      )}
    </ReactDropzone>
  );
};

FileUploader.propTypes = {
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  acceptClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  className: PropTypes.string,
  disabledClassName: PropTypes.string,
  errorMessage: PropTypes.node,
  footer: PropTypes.node,
  isDropZoneActive: PropTypes.bool.isRequired,
  maxSize: PropTypes.number,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func.isRequired,
  rejectClassName: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.node.isRequired,
  uploadButtonText: PropTypes.node.isRequired,
};

FileUploader.defaultProps = {
  className: '',
};

export default FileUploader;