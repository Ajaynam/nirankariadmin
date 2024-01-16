import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { APP_NAME } from '../../constants/app.constant'
// import jivhalaLogo from './logoJivhala.png'
import visitorLogo from "./nirankariLogo.png"

// const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props) => {
    const { gutter, className, imgClass, style, logoWidth } = props

    return (
        <div
            className={classNames('logo', className, gutter)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={imgClass}
                // src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
                // src={`https://www.gmartnx.co.in/user-assets/images/company/web-logo.svg`}
                src={visitorLogo}
                alt={`${APP_NAME} logo`}
                width={80}
            />
        </div>
    )
}

Logo.defaultProps = {
    mode: 'light',
    type: 'full',
    logoWidth: 'auto',
}

Logo.propTypes = {
    mode: PropTypes.oneOf(['light', 'dark']),
    type: PropTypes.oneOf(['full', 'streamline']),
    gutter: PropTypes.string,
    imgClass: PropTypes.string,
    logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Logo
