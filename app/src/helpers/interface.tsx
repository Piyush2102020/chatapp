interface PostProps {
    item: {_id:string,
        dp: string | null;
        userid?: {
            username: string;
            name: string;
        };
        createdAt: string; // ISO string format
        textContent: string;
        mediaContentUrl?: string | null;
        isLiked:boolean;
        likeCount:number
    };
}


export default PostProps;