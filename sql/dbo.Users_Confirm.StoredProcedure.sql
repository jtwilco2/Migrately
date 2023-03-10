CREATE proc [dbo].[Users_Confirm]
			@Id int
			,@IsConfirmed bit 

/*
Declare 
	@Id int = 1
	,@IsConfirmed bit = 0

	Execute dbo.Users_SelectById
			@Id
	Execute dbo.Users_Confirm
			@Id
			,@IsConfirmed
	Execute dbo.Users_SelectById
			@Id
*/

AS

BEGIN

Declare @DateNow datetime2 = getutcdate()

UPDATE [dbo].[Users]
   SET 
      [IsConfirmed] = @IsConfirmed
      ,[DateModified] = @DateNow
 WHERE Id = @Id

END


GO
