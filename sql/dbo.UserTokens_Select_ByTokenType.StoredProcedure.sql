CREATE proc [dbo].[UserTokens_Select_ByTokenType]
			@TokenType int

/*
Declare @TokenType int = 1

Execute dbo.UserTokens_Select_ByTokenType
		@TokenType
*/

AS

BEGIN

SELECT [Token]
      ,[UserId]
      ,[TokenType]
  FROM [dbo].[UserTokens]
  WHERE TokenType = @TokenType

END


GO
