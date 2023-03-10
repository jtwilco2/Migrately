CREATE proc [dbo].[Users_Update_Password]
			@Id int
			,@Password varchar(100)

/*

Declare @Id int = 1
		,@Password varchar(100) = 'updatedPassword1!'

Execute dbo.Users_SelectById 
				@Id

Execute dbo.Users_Update_Password 
				@Id
				,@Password

Execute dbo.Users_SelectById 
				@Id
*/

AS

BEGIN

Declare @DateNow datetime2(7) = getutcdate()

UPDATE [dbo].[Users]
   SET [Password] = @Password
      ,[DateModified] = @DateNow
 WHERE Id = @Id

END


GO
