CREATE proc [dbo].[Users_Data_Update]
            @FirstName nvarchar(100)
           ,@LastName nvarchar(100)
           ,@AvatarUrl nvarchar(255)
		   ,@Id int OUTPUT
/*


Declare			
            @FirstName nvarchar(100) = 'John'
           ,@LastName nvarchar(100) = 'Smith'
           ,@AvatarUrl nvarchar(255)= 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
		   ,@Id int = 86
		

Execute dbo.Users_Data_Update
	
            @FirstName 
           ,@LastName 
           ,@AvatarUrl 
		   ,@Id OUTPUT 

Execute dbo.Users_SelectById @Id
*/

AS

BEGIN

Update [dbo].[Users]

	SET
            [FirstName] = @FirstName
           ,[LastName] = @LastName
           ,[AvatarUrl] = @AvatarUrl
   
	WHERE Id = @Id
END


GO
