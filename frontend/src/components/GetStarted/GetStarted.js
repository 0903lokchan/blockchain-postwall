import React, { useState } from 'react';
import classnames from 'classnames';

import WarningMessage from '../WarningMessage/WarningMessage';
import Detail from './Detail';
import MasterList from './MasterList';
import Wallet from './Detail/Wallet';
import MainFunc from './Detail/MainFunc';
import CreatePosts from './Detail/CreatePosts';

import styles from './styles.module.css';

const GetStarted = () => {
	const sections = [
		{id: 1,
		title: "Connect to your Blockchain wallet",
		content: Wallet,},
		{id: 2,
		title: "Main Functions",
		content: MainFunc},
		{id: 3,
		title: "Create posts",
		content: CreatePosts},
		]
	const [ currentSection, setCurrentSection ] = useState({});
	const [ warningMessage, setWarningMessage ] = useState({ warningMessageOpen: false, warningMessageText: '' });
	const sidebarStyle = classnames('col-2', 'p-0', 'border-right', styles.sidebar);

	const closeWarningMessage = () => {
		setWarningMessage({ warningMessageOpen: false, warningMessageText: '' });
	};

	React.useEffect(() => {
		setCurrentSection(sections[0]);
	}, []);

	return (
		<main id="mainContent">
			<div className="container-fluid">
				<div className="row">
					<div className={sidebarStyle}>
						<div className="list-group list-group-flush border-bottom">
							{sections.map((section) => (
								<MasterList
									selectSection={setCurrentSection}
									section={section}
									key={section.id}
									isActive={section === currentSection}
								/>
							))}
						</div>
					</div>
					{currentSection.id && <Detail section={currentSection} />}
				</div>
			</div>
			<WarningMessage
				open={warningMessage.warningMessageOpen}
				text={warningMessage.warningMessageText}
				onWarningClose={closeWarningMessage}
			/>
		</main>
	);
};

export default GetStarted;
