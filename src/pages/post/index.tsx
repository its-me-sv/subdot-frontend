import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/app";

import { postPage } from "../../translations/page-titles";

interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = () => {
    const params = useParams();
    const {language} = useAppContext();

    useEffect(() => {
        window.document.title = `${postPage[language]} / Subdot`;
    }, [language]);

    return (
        <div>
            {params.id}
        </div>
    );
};

export default PostPage;
