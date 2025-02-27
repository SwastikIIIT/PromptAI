import React from 'react'
import PromptCard from './PromptCard'
import Link from 'next/link';

const Profile = ({name,posts,setPostData,email}) => {

   const handleDelete=async(post)=>{
      const hasConfirmed=confirm("Are you sure you want to delete this post?");
      if(hasConfirmed)
      {
          try{
                let deletedPost=await fetch(`/api/prompt/${post._id.toString()}`,{
                  method:'DELETE'
                }) 
                deletedPost=deletedPost.json();

                const  filteredPost=posts.filter((item)=>(
                  item._id!==post._id
                ))

                setPostData(filteredPost);
          }
          catch(err)
          {
            console.log(err);
          }
      }
    }
  

  return (
    <section className='w-full'>
        <h1 className='head_text blue_gradient text-left'>{name} Profile</h1>
        <p className='desc text-left'>Welcome to your personalized page</p>
        <p className='desc text-left'>Email: {email}</p>
        
        <div className='mt-10 prompt_layout'>
            {posts?.map((item)=>(
                <PromptCard
                    key={item._id}
                    post={item}
                    handleDelete={()=>handleDelete(item)}
                />
            ))}
        </div>

    </section>
  )
}

export default Profile