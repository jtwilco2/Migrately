CREATE proc [dbo].[PageSection_Delete]
		@Id int

as

/* -----------Test Code---------------
Declare @Id int = 7;

		Select *
		From dbo.PageSection
		Where Id = @Id

Execute dbo.PageSection_Delete @Id


		Select *
		From dbo.PageSection
		Where Id = @Id

------------------------------------*/
BEGIN

UPDATE [dbo].[PageSection]
   SET [IsActive] = 0
 WHERE Id=@Id

END


GO
