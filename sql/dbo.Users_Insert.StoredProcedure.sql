CREATE proc [dbo].[Users_Insert]
		   @Email nvarchar(255)
           ,@FirstName nvarchar(100)
           ,@LastName nvarchar(100)
           ,@Mi nvarchar(2)
           ,@AvatarUrl varchar(255)
           ,@Password varchar(100)
		   ,@Id int OUTPUT
/*
Declare 
			@Email nvarchar(255) = 'samples@email.com'
           ,@FirstName nvarchar(100) = 'Jane'
           ,@LastName nvarchar(100) = 'Smith'
           ,@Mi nvarchar(2) = 'S'
           ,@AvatarUrl varchar(255)= 'anImages.com'
           ,@Password varchar(100) = 'password22'
		   ,@Id int 
Execute dbo.Users_Insert
			@Email 
           ,@FirstName 
           ,@LastName 
           ,@Mi 
           ,@AvatarUrl 
           ,@Password
		   ,@Id OUTPUT 

Execute dbo.Users_SelectById @Id
*/

AS

BEGIN

INSERT INTO [dbo].[Users]
           ([Email]
           ,[FirstName]
           ,[LastName]
           ,[Mi]
           ,[AvatarUrl]
           ,[Password])
     VALUES
		   (@Email 
           ,@FirstName 
           ,@LastName 
           ,@Mi 
           ,@AvatarUrl 
           ,@Password) 
	SET @Id = SCOPE_IDENTITY()
END


GO
