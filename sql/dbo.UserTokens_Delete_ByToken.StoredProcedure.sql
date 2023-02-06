CREATE proc [dbo].[UserTokens_Delete_ByToken]
			@Token varchar(200)
			,@Id int
/*
Declare
	@Token varchar(200) = '022e8468-7cec-44aa-adcf-9be17b99eae0'
	,@Id int = 52

Execute dbo.UserTokens_Delete_ByToken
		@Token
		,@Id
*/

AS

BEGIN

DELETE FROM [dbo].[UserTokens]
      WHERE Token = @Token AND UserId = @Id
END


GO
