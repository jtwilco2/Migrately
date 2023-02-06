CREATE proc [dbo].[Users_SelectPass_ByEmail]
			@Email nvarchar(255)

/*
Declare @Email nvarchar(255) = 'sample@email.com'

Execute dbo.Users_SelectPass_ByEmail
		@Email
*/

AS

BEGIN

SELECT 
      [Password]
      
  FROM [dbo].[Users]
  WHERE Email = @Email

END


GO
