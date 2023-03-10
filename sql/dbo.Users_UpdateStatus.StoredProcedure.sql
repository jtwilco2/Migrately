CREATE proc [dbo].[Users_UpdateStatus]
			@Id int
			,@StatusId int

/*
Declare		
			@Id int = 1
			,@StatusId int = 1

	Execute dbo.Users_SelectById
			@Id
	Execute dbo.Users_UpdateStatus
			@Id
			,@StatusId
	Execute dbo.Users_SelectById
			@Id
*/

AS

BEGIN

Declare @DateNow datetime2 = getutcdate()

UPDATE [dbo].[Users]
   SET [StatusId] = @StatusId
      ,[DateModified] = @DateNow
 WHERE Id = @Id

END

GO
