CREATE proc [dbo].[Users_SelectId_ByEmailToken]
			@Email nvarchar(255)
			,@Token varchar(200)
/*

DECLARE 
	@Email nvarchar(255) = 'Juan1@dispostable.com'
	,@Token varchar(200) = '92fbaa5a-cfdb-4535-a5d0-5551b737b7ab'

EXECUTE dbo.Users_SelectEmailToken_ById
		@Email
		,@Token
*/

AS

BEGIN

SELECT u.[Id]
      ,u.[Email]
	  ,ut.[Token]
      
  FROM [dbo].[Users] as u inner join dbo.UserTokens as ut
			on u.id = ut.UserId
  WHERE u.Email = @Email AND ut.Token = @Token

END


GO
