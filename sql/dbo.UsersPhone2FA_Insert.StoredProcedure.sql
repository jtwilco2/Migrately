CREATE proc [dbo].[UsersPhone2FA_Insert]
			@Email nvarchar(255)
           ,@FirstName nvarchar(100)
           ,@LastName nvarchar(100)
           ,@Mi nvarchar(2)
           ,@AvatarUrl varchar(255)
           ,@Password varchar(100)
		   ,@PhoneNumber nvarchar(50)
		   ,@IsActive bit
		   ,@Is2FAEnabled bit
		   ,@Id int OUTPUT



/* Test Code

Declare 
			@Email nvarchar(255) = 'samples@email.com'
           ,@FirstName nvarchar(100) = 'Jane'
           ,@LastName nvarchar(100) = 'Smith'
           ,@Mi nvarchar(2) = 'S'
           ,@AvatarUrl varchar(255)= 'anImages.com'
           ,@Password varchar(100) = 'password22'
		   ,@PhoneNumber nvarchar(50) = '6266367120'
		   ,@IsActive bit = 'True'
		   ,@Is2FAEnabled bit = 'True'
		   ,@Id int 

Execute dbo.UsersPhone2FA_Insert
			@Email 
           ,@FirstName 
           ,@LastName 
           ,@Mi 
           ,@AvatarUrl 
           ,@Password
		   ,@PhoneNumber
		   ,@IsActive
		   ,@Is2FAEnabled
		   ,@Id OUTPUT 

Select * FROM dbo.Users 


*/ 

AS 

BEGIN

Declare @UserId int = 0

INSERT INTO dbo.UserBridge2FA
			([PhoneNumber]
		   ,[IsActive]
		   ,[Is2FAEnabled])

	VALUES
			(@PhoneNumber 
		   ,@IsActive 
		   ,@Is2FAEnabled)

SET @UserId = SCOPE_IDENTITY()

INSERT INTO dbo.Users
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
