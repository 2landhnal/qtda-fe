import Header2 from '../../components/Header2';
function HeaderOnly({ children }) {
    return (
        <div>
            <Header2 />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
